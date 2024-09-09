import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity.js";
import { userIdBody } from "../../../contracts/userId.body.js";

export const getAllForUserInAllFridges = async (body: userIdBody) => {
  const em = RequestContext.getEntityManager();
  return em.findAndCount(Product, {
    user: { id: body.user },
    fridge: { $ne: null },
  });
};
