import { RequestContext } from "@mikro-orm/core";
import { getProductsForUserFridgeBody } from "../../../contracts/getProductsForUser.fridge.body.js";
import { Product } from "../../../entities/product.entity.js";

export const getProductsForUser = async (
  body: getProductsForUserFridgeBody,
  fridgeId: string
) => {
  const em = RequestContext.getEntityManager();
  return em.findAndCount(Product, {
    user: { id: body.user },
    fridge: { id: fridgeId },
  });
};
