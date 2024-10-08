import { RequestContext } from "@mikro-orm/core";
import { ProductBody } from "../../../contracts/product.body.js";
import { Product } from "../../../entities/product.entity.js";

export const create = async (body: ProductBody) => {
  const em = RequestContext.getEntityManager();
  const product = em.create(Product, body);
  await em.persistAndFlush(product);
  return product;
};
