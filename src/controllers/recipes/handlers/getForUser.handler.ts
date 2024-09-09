import { RequestContext } from "@mikro-orm/core";
import { userIdBody } from "../../../contracts/userId.body.js";
import { Recipe } from "../../../entities/recipe.entity.js";

export const getForUser = async (body: userIdBody) => {
  const em = RequestContext.getEntityManager();
  return await em.findAndCount(Recipe, { user: body.user });
};
