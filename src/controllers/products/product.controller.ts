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
import { addToFridge } from "./handlers/addToFridge.handler.js";
import { addToOrDeleteFromFridgeProductBody } from "../../contracts/addToOrDeleteFromFridge.product.body.js";
import { deleteFromFridge } from "./handlers/deleteFromFridge.handler.js";
import { get } from "./handlers/get.handler.js";
import { userIdBody } from "../../contracts/userId.body.js";
import { getAllForUserInAllFridges } from "./handlers/getAllForUserInAllFridges.handler.js";
import { userIdFridgeLocationBody } from "../../contracts/userIdFridgeLocation.body.js";
import { getAllForUserInAllFridgesWithLocation } from "./handlers/getAllForUserInAllFridgesWithLocation.handler.js";

@JsonController("/products")
export class ProductController {
  @Get("/get_all_for_user_in_all_fridges")
  @ListRepresenter(ProductView)
  async getAllForUserInAllFridges(@Body() body: userIdBody) {
    return await getAllForUserInAllFridges(body);
  }

  @Get("/get_all_for_user_in_all_fridges_with_location")
  @ListRepresenter(ProductView)
  async getAllForUserInAllFridgesWithLocation(
    @Body() body: userIdFridgeLocationBody
  ) {
    return await getAllForUserInAllFridgesWithLocation(body);
  }

  @Get("/:id")
  @Representer(ProductView)
  async get(@Param("id") id: string) {
    return get(id);
  }

  @Post()
  @Representer(ProductView, StatusCode.created)
  @OpenAPI({ summary: "Create a new product" })
  async create(@Body() body: ProductBody) {
    return create(body);
  }

  @Post("/:id/fridge")
  @Representer(ProductView)
  async addToFridge(
    @Body() body: addToOrDeleteFromFridgeProductBody,
    @Param("id") id: string
  ) {
    return addToFridge(body, id);
  }

  @Delete("/:id/fridge")
  @Representer(ProductView)
  async deleteFromFridge(
    @Body() body: addToOrDeleteFromFridgeProductBody,
    @Param("id") id: string
  ) {
    return deleteFromFridge(body, id);
  }
}
