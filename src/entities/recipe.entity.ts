import {
  BaseEntity,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { randomUUID } from "node:crypto";
import { Product } from "./product.entity.js";
import { User } from "./user.entity.js";
@Entity()
export class Recipe extends BaseEntity<Recipe, "id"> {
  @PrimaryKey({ columnType: "uuid" })
  public id: string = randomUUID();

  @Property()
  public name: string;

  @Property()
  public description: string;

  @ManyToOne(() => User)
  public user: Rel<User>;

  @OneToMany(() => Product, (product) => product.recipe)
  public ingredients = new Collection<Product>(this);
}
