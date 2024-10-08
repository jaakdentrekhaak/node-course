import { BadRequest, NotFound, ValidationError } from "@panenco/papi";
import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity.js";
import { addToOrDeleteFromFridgeProductBody } from "../../../contracts/addToOrDeleteFromFridge.product.body.js";
import { Fridge } from "../../../entities/fridge.entity.js";

export const addToFridge = async (
  body: addToOrDeleteFromFridgeProductBody,
  id: string
) => {
  const em = RequestContext.getEntityManager();
  const product = await em.findOne(Product, { id });

  if (!product) {
    throw new NotFound("productNotFound", "Product not found");
  }

  const fridge = await em.findOne(Fridge, { id: body.fridge });

  if (!fridge) {
    throw new NotFound("fridgeNotFound", "Fridge not found");
  }

  const [productsInFridge, count] = await em.findAndCount(Product, {
    fridge: fridge.id,
  });

  const currentInventorySize = productsInFridge
    .map((product) => product.size)
    .reduce((partialSum, a) => partialSum + a, 0);

  // // Can also work using an aggregate query instead (then do const em = RequestContext.getEntitiyManager() as EntityManager (that we have to import from "@mikro-orm/postgresql"))
  // const [currentInventorySize] = await em
  // .createQueryBuilder(Product, "product")
  // .where({ fridge: { location: body.fridge } })
  // .select("sum(product.size) as inventorySize")
  // .groupBy("product.fridge_id")
  // .execute<string[]>();

  if (currentInventorySize + product.size > fridge.capacity) {
    throw new BadRequest(
      "capacityExceeded",
      "This product can't fit in the fridge anymore."
    );
  }

  product.assign(body);
  await em.flush();
  return product;
};
