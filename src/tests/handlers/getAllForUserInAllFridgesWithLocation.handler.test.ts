import { MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import ormConfig from "../../orm.config.js";
import { Product } from "../../entities/product.entity.js";
import { Fridge } from "../../entities/fridge.entity.js";
import { expect } from "chai";
import { addToFridge } from "../../controllers/products/handlers/addToFridge.handler.js";
import { addToOrDeleteFromFridgeProductBody } from "../../contracts/addToOrDeleteFromFridge.product.body.js";
import { getAllForUserInAllFridgesWithLocation } from "../../controllers/products/handlers/getAllForUserInAllFridgesWithLocation.handler.js";
import { User } from "../../entities/user.entity.js";
import { userBuys } from "../../controllers/products/handlers/userBuys.handler.js";

const productFixtures: Product[] = [
  {
    size: 10,
    name: "banana",
  } as Product,
  {
    size: 30,
    name: "cheesecake",
  } as Product,
  {
    size: 5,
    name: "appelsapje",
  } as Product,
  {
    size: 20,
    name: "sausage",
  } as Product,
];

const fridgeFixtures: Fridge[] = [
  { location: "sint-truiden", capacity: 100 } as Fridge,
  { location: "sint-truiden", capacity: 150 } as Fridge,
  { location: "geetbets", capacity: 50 } as Fridge,
];

const userFixture: User = {
  name: "jaak",
  email: "jaak@gmail.com",
  password: "thisisaverylongpassword",
} as User;

describe("Handler tests", () => {
  describe("getAllForUserInAllFridgesWithLocation tests", () => {
    let orm: MikroORM<PostgreSqlDriver>;
    let products: Product[];
    let fridges: Fridge[];
    let user: User;
    before(async () => {
      orm = await MikroORM.init(ormConfig);
    });

    beforeEach(async () => {
      await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
      await orm.getMigrator().up();
      const em = orm.em.fork();
      products = productFixtures.map((x) => em.create(Product, x));
      await em.persistAndFlush(products);
      fridges = fridgeFixtures.map((x) => em.create(Fridge, x));
      await em.persistAndFlush(fridges);
      user = em.create(User, userFixture);
      await em.persistAndFlush(user);
    });

    it("get all products for user in all the fridges in a location", async () => {
      await RequestContext.createAsync(orm.em.fork(), async () => {
        let banana = await orm.em.findOne(Product, { name: "banana" });
        let cheesecake = await orm.em.findOne(Product, { name: "cheesecake" });
        let appelsapje = await orm.em.findOne(Product, { name: "appelsapje" });
        let sausage = await orm.em.findOne(Product, { name: "sausage" });

        const [fridgesSt, count1] = await orm.em.findAndCount(Fridge, {
          location: "sint-truiden",
        });
        const fridgeSt1 = fridgesSt[0];
        const fridgeSt2 = fridgesSt[1];
        const fridgeGb = await orm.em.findOne(Fridge, { location: "geetbets" });

        banana = await addToFridge({ fridge: fridgeSt1.id }, banana.id);
        cheesecake = await addToFridge({ fridge: fridgeSt1.id }, cheesecake.id);
        appelsapje = await addToFridge({ fridge: fridgeSt2.id }, appelsapje.id);
        sausage = await addToFridge({ fridge: fridgeGb.id }, sausage.id);

        banana = await userBuys({ user: user.id }, banana.id);
        cheesecake = await userBuys({ user: user.id }, cheesecake.id);
        appelsapje = await userBuys({ user: user.id }, appelsapje.id);
        sausage = await userBuys({ user: user.id }, sausage.id);

        const [allProductsForUsers, count] =
          await getAllForUserInAllFridgesWithLocation({
            user: user.id,
            fridgeLocation: "sint-truiden",
          });

        expect(count).equal(3);

        const allProductsForUsersIds = new Set(
          allProductsForUsers.map((product) => product.id)
        );

        expect(allProductsForUsersIds.has(banana.id)).true;
        expect(allProductsForUsersIds.has(cheesecake.id)).true;
        expect(allProductsForUsersIds.has(appelsapje.id)).true;
        expect(allProductsForUsersIds.has(sausage.id)).false;
      });
    });
  });
});
