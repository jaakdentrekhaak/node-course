import { NotFound } from "@panenco/papi";
import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity.js";
import { userIdBody } from "../../../contracts/userId.body.js";
import { User } from "../../../entities/user.entity.js";

export const userBuys = async (body: userIdBody, id: string) => {
  const em = RequestContext.getEntityManager();
  const product = await em.findOne(Product, { id });
  const user = await em.findOne(User, { id: body.user });

  if (!product) {
    throw new NotFound("productNotFound", "Product not found");
  }

  if (!user) {
    throw new NotFound("userNotFound", "User not found");
  }

  product.user = user;
  await em.flush();
  return product;
};
