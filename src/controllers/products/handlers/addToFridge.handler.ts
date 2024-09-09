import { NotFound } from "@panenco/papi";
import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity.js";
import { addToOrDeleteFromFridgeProductBody } from "../../../contracts/addToOrDeleteFromFridge.product.body.js";

export const addToFridge = async (
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

  // TODO: return error if product doesn't fit in the fridge
  // Get all products in fridge
  // Count sizes of products
  // Check if sum of sizes of existing products and the new product exceeds the fridge's capacity

  product.assign(body);
  await em.flush();
  return product;
};
