import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { randomUUID } from "node:crypto";
import { Product } from "./product.entity.js";
@Entity()
export class Fridge extends BaseEntity<Fridge, "id"> {
  @PrimaryKey({ columnType: "uuid" })
  public id: string = randomUUID();

  @Property()
  public location: string;

  @Property()
  public capacity: string;

  @ManyToMany(() => Product)
  public products = new Collection<Product>(this);
}
