import { MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import ormConfig from "../../orm.config.js";
import { Product } from "../../entities/product.entity.js";
import { Fridge } from "../../entities/fridge.entity.js";
import { expect } from "chai";
import { addToFridge } from "../../controllers/products/handlers/addToFridge.handler.js";
import { addToOrDeleteFromFridgeProductBody } from "../../contracts/addToOrDeleteFromFridge.product.body.js";

const productFixtures: Product[] = [
  {
    size: 10,
  } as Product,
  {
    size: 30,
  } as Product,
];

const fridgeFixtures: Fridge[] = [
  { location: "sint-truiden", capacity: 100 } as Fridge,
];

describe("Handler tests", () => {
  describe("addToFridge tests", () => {
    let orm: MikroORM<PostgreSqlDriver>;
    let products: Product[];
    let fridges: Fridge[];
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
    });

    it("add product to fridge", async () => {
      await RequestContext.createAsync(orm.em.fork(), async () => {
        const randomFridge = await orm.em.findOne(
          Fridge,
          {
            id: { $ne: null },
          },
          { populate: ["products"] }
        );
        const randomProduct = await orm.em.findOne(Product, {
          id: { $ne: null },
        });

        expect(
          randomFridge.products
            .getItems()
            .map((product) => product.id)
            .includes(randomProduct.id)
        ).false;

        const body: addToOrDeleteFromFridgeProductBody = {
          fridge: randomFridge.id,
        };
        const res = await addToFridge(body, randomProduct.id);

        const randomFridgeUpdated = await orm.em.findOne(
          Fridge,
          { id: randomFridge.id },
          { populate: ["products"] }
        );

        expect(
          randomFridge.products
            .getItems()
            .map((product) => product.id)
            .includes(randomProduct.id)
        ).true;
      });
    });
  });
});
