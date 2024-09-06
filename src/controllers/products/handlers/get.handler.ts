import { NextFunction, Request, Response } from "express";
import { NotFound } from "@panenco/papi";
import { RequestContext } from "@mikro-orm/core";
import { Product } from "../../../entities/product.entity.js";

export const get = async (id: string) => {
  const em = RequestContext.getEntityManager();
  const product = await em.findOne(Product, { id });
  if (!product) {
    throw new NotFound("productNotFound", "Product not found");
  }
  return product;
};
