import { RequestContext } from "@mikro-orm/core";
import { Recipe } from "../../../entities/recipe.entity.js";
import { NotFound } from "@panenco/papi";
import { getAllForUserInAllFridges } from "../../products/handlers/getAllForUserInAllFridges.handler.js";
import { Product } from "../../../entities/product.entity.js";

export const getMissingIngredients = async (id: string) => {
  const em = RequestContext.getEntityManager();
  const recipe = await em.findOne(
    Recipe,
    { id },
    { populate: ["ingredients"] }
  );

  if (!recipe) {
    throw new NotFound("recipeNotFound", "Recipe not found");
  }

  const [productsInFridges, count] = await getAllForUserInAllFridges({
    user: recipe.user.id,
  });

  const productsInFridgesIds = new Set(
    productsInFridges.map((product) => product.id)
  );

  const missingIngredients = recipe.ingredients
    .getItems()
    .filter((ingredient) => {
      return !productsInFridgesIds.has(ingredient.id);
    });

  return [missingIngredients, missingIngredients.length];
};
