import { RequestContext } from "@mikro-orm/core";
import { RecipeBody } from "../../../contracts/recipe.body.js";
import { Recipe } from "../../../entities/recipe.entity.js";
import { NotFound } from "@panenco/papi";

export const update = async (body: RecipeBody, id: string) => {
  const em = RequestContext.getEntityManager();
  const recipe = await em.findOne(Recipe, { id });

  if (!recipe) {
    throw new NotFound("recipeNotFound", "Recipe not found");
  }
  recipe.assign(body);
  await em.flush();
  return recipe;
};
