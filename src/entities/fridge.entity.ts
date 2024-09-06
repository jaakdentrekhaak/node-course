import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
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
  public capacity: number;

  @OneToMany(() => Product, (product) => product.fridge)
  public products = new Collection<Product>(this);
}
