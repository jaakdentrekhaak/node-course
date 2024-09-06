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
import { Recipe } from "./recipe.entity.js";
@Entity()
export class User extends BaseEntity<User, "id"> {
  @PrimaryKey({ columnType: "uuid" })
  public id: string = randomUUID();

  @Property()
  public name: string;

  @Property({ unique: true })
  public email: string;

  @Property()
  public password: string;

  @OneToMany(() => Product, (product) => product.user)
  public products = new Collection<Product>(this);

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  public recipes = new Collection<Recipe>(this);
}
