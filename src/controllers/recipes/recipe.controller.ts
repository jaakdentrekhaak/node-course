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

@JsonController("/recipes")
export class RecipeController {
  @Post()
  @Representer(RecipeView, StatusCode.created)
  @OpenAPI({ summary: "Create a new recipe" })
  async create(@Body() body: RecipeBody) {
    return create(body);
  }

  @Patch("/:id")
  @Representer(RecipeView)
  // @Authorized()
  async update(
    @Body({}, { skipMissingProperties: true }) body: RecipeBody,
    @Param("id") id: string
  ) {
    return update(body, id);
  }

  @Delete("/:id")
  @Representer(null)
  // @Authorized()
  async delete(@Param("id") id: string) {
    return deleteRecipe(id);
  }

  // @Get()
  // @ListRepresenter(UserView)
  // @Authorized()
  // async getList(@Query() query: SearchQuery) {
  //   return getList(query.search);
  // }

  // @Get("/:id")
  // @Representer(UserView)
  // @Authorized()
  // async get(@Param("id") id: string) {
  //   return get(id);
  // }

  // @Patch("/:id")
  // @Representer(UserView)
  // @Authorized()
  // async update(
  //   @Body({}, { skipMissingProperties: true }) body: UserBody,
  //   @Param("id") id: string
  // ) {
  //   return update(body, id);
  // }

  // @Delete("/:id")
  // @Representer(null)
  // @Authorized()
  // async delete(@Param("id") id: string) {
  //   return deleteUser(id);
  // }
}
