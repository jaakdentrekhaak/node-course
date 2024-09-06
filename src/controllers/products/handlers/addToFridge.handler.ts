import { UserBody } from "../../../contracts/user.body.js";
import { NotFound } from "@panenco/papi";
import { RequestContext } from "@mikro-orm/core";
import { User } from "../../../entities/user.entity.js";
import { ProductBody } from "../../../contracts/product.body.js";
import { Product } from "../../../entities/product.entity.js";
import { addToOrDeleteFromFridgeProductBody } from "../../../contracts/addToFridge.product.body.js";

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
  product.assign(body);
  await em.flush();
  return product;
};
