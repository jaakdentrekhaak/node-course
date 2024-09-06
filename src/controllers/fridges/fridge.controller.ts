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
import { ProductView } from "../../contracts/product.view.js";
import { ProductBody } from "../../contracts/product.body.js";
import { create } from "./handlers/create.handler.js";
import { FridgeView } from "../../contracts/fridge.view.js";
import { FridgeBody } from "../../contracts/fridge.body.js";
import { getProductsForUserFridgeBody } from "../../contracts/getProductsForUser.fridge.body.js";
import { getProductsForUser } from "./handlers/getProductsForUser.handler.js";

@JsonController("/fridges")
export class FridgeController {
  @Post()
  @Representer(FridgeView, StatusCode.created)
  @OpenAPI({ summary: "Create a new fridge" })
  async create(@Body() body: FridgeBody) {
    return create(body);
  }

  @Get("/:id/get_products_for_user")
  @ListRepresenter(ProductView)
  async getProductsForUser(
    @Body() body: getProductsForUserFridgeBody,
    @Param("id") id: string
  ) {
    return await getProductsForUser(body, id);
  }

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
