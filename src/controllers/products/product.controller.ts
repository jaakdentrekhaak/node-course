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
import { addToOrDeleteFromFridgeProductBody } from "../../contracts/addToFridge.product.body.js";
import { deleteFromFridge } from "./handlers/deleteFromFridge.handler.js";
import { get } from "./handlers/get.handler.js";

@JsonController("/products")
export class ProductController {
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

  @Get("/:id")
  @Representer(ProductView)
  async get(@Param("id") id: string) {
    return get(id);
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
