import { NotFound } from "@panenco/papi";
import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity.js";
import { addToOrDeleteFromFridgeProductBody } from "../../../contracts/addToFridge.product.body.js";

export const deleteFromFridge = async (
  body: addToOrDeleteFromFridgeProductBody,
  id: string
) => {
  const em = RequestContext.getEntityManager();
  const product = await em.findOne(Product, { id });

  // TODO: automatically throws error if fridge doesn't exist because of violation of foreign key
  // I could handle this more clean

  if (!product) {
    throw new NotFound("productNotFound", "Product not found");
  }
  product.fridge = null;
  await em.flush();
  return product;
};
