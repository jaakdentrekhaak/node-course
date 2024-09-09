import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity.js";
import { userIdFridgeLocationBody } from "../../../contracts/userIdFridgeLocation.body.js";
import { Fridge } from "../../../entities/fridge.entity.js";

export const getAllForUserInAllFridgesWithLocation = async (
  body: userIdFridgeLocationBody
) => {
  const em = RequestContext.getEntityManager();

  return em.findAndCount(Product, {
    user: { id: body.user },
    fridge: { location: body.fridgeLocation },
  });
};
