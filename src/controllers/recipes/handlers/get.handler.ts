import { RequestContext } from "@mikro-orm/core";
import { Recipe } from "../../../entities/recipe.entity.js";
import { NotFound } from "@panenco/papi";

export const get = async (id: string) => {
  const em = RequestContext.getEntityManager();
  const recipe = em.findOne(Recipe, { id });
  if (!recipe) {
    throw new NotFound("recipeNotFound", "Recipe not found");
  }
  return recipe;
};
