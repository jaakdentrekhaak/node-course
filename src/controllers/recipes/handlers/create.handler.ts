import { RequestContext } from "@mikro-orm/core";
import { ProductBody } from "../../../contracts/product.body.js";
import { Product } from "../../../entities/product.entity.js";
import { RecipeBody } from "../../../contracts/recipe.body.js";
import { Recipe } from "../../../entities/recipe.entity.js";

export const create = async (body: RecipeBody) => {
  const em = RequestContext.getEntityManager();
  const recipe = em.create(Recipe, body);
  await em.persistAndFlush(recipe);
  return recipe;
};
