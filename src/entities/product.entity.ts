import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { randomUUID } from "node:crypto";
import { User } from "./user.entity.js";
import { Fridge } from "./fridge.entity.js";
import { Recipe } from "./recipe.entity.js";
@Entity()
export class Product extends BaseEntity<Product, "id"> {
  @PrimaryKey({ columnType: "uuid" })
  public id: string = randomUUID();

  @Property()
  public size: number;

  @ManyToOne(() => User, { nullable: true })
  public user: Rel<User>;

  @ManyToOne(() => Fridge, { nullable: true })
  public fridge?: Rel<Fridge>;

  @ManyToOne(() => Recipe, { nullable: true })
  public recipe?: Rel<Recipe>;
}
