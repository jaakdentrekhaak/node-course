import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { randomUUID } from "node:crypto";
import { User } from "./user.entity.js";
import { Fridge } from "./fridge.entity.js";
@Entity()
export class Product extends BaseEntity<Product, "id"> {
  @PrimaryKey({ columnType: "uuid" })
  public id: string = randomUUID();

  @Property()
  public size: number;

  @ManyToMany(() => User, (user) => user.products)
  public users = new Collection<User>(this);

  @ManyToMany(() => Fridge, (fridge) => fridge.products)
  public fridges = new Collection<Fridge>(this);
}
