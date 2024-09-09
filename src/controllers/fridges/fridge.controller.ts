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
  @Authorized()
  async create(@Body() body: FridgeBody) {
    return create(body);
  }

  @Get("/:id/get_products_for_user")
  @ListRepresenter(ProductView)
  @Authorized()
  async getProductsForUser(
    @Body() body: getProductsForUserFridgeBody,
    @Param("id") id: string
  ) {
    return await getProductsForUser(body, id);
  }
}
