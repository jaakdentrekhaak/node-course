import {
  Authorized,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
} from "routing-controllers";
import {
  Body,
  ListRepresenter,
  Query,
  Representer,
  StatusCode,
} from "@panenco/papi";
import { OpenAPI } from "routing-controllers-openapi";
import { create } from "./handlers/create.handler.js";
import { RecipeBody } from "../../contracts/recipe.body.js";
import { RecipeView } from "../../contracts/recipe.view.js";
import { deleteRecipe } from "./handlers/delete.handler.js";
import { update } from "./handlers/update.handler.js";
import { userIdBody } from "../../contracts/userId.body.js";
import { getForUser } from "./handlers/getForUser.handler.js";
import { get } from "./handlers/get.handler.js";
import { ProductView } from "../../contracts/product.view.js";
import { getMissingIngredients } from "./handlers/getMissingIngredients.handler.js";

@JsonController("/recipes")
export class RecipeController {
  @Get("/for_user")
  @ListRepresenter(RecipeView)
  @Authorized()
  @OpenAPI({ summary: "Get recipes for specific user" })
  async getForUser(@Body() body: userIdBody) {
    return getForUser(body);
  }

  @Get("/:id/get_missing_ingredients")
  @ListRepresenter(ProductView)
  @Authorized()
  @OpenAPI({
    summary: "Get the missing ingredients for this recipes",
    description:
      "Based on the products the owner of the recipe has in the fridges",
  })
  async getMissingIngredients(@Param("id") id: string) {
    return await getMissingIngredients(id);
  }

  @Get("/:id")
  @Representer(RecipeView)
  @Authorized()
  @OpenAPI({ summary: "Get recipe" })
  async get(@Param("id") id: string) {
    return get(id);
  }

  @Post()
  @Representer(RecipeView, StatusCode.created)
  @Authorized()
  @OpenAPI({ summary: "Create new recipe" })
  async create(@Body() body: RecipeBody) {
    return create(body);
  }

  @Patch("/:id")
  @Representer(RecipeView)
  @Authorized()
  @OpenAPI({ summary: "Update recipe" })
  async update(
    @Body({}, { skipMissingProperties: true }) body: RecipeBody,
    @Param("id") id: string
  ) {
    return update(body, id);
  }

  @Delete("/:id")
  @Representer(null)
  @Authorized()
  @OpenAPI({ summary: "Delete recipe" })
  async delete(@Param("id") id: string) {
    return deleteRecipe(id);
  }
}
