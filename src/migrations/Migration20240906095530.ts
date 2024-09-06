import { Migration } from '@mikro-orm/migrations';

export class Migration20240906095530 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "fridge" ("id" uuid not null, "location" varchar(255) not null, "capacity" varchar(255) not null, constraint "fridge_pkey" primary key ("id"));');

    this.addSql('create table "product" ("id" uuid not null, "size" int not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "fridge_products" ("fridge_id" uuid not null, "product_id" uuid not null, constraint "fridge_products_pkey" primary key ("fridge_id", "product_id"));');

    this.addSql('create table "recipe" ("id" uuid not null, "name" varchar(255) not null, "description" varchar(255) not null, "user_id" uuid not null, constraint "recipe_pkey" primary key ("id"));');

    this.addSql('create table "recipe_ingredients" ("recipe_id" uuid not null, "product_id" uuid not null, constraint "recipe_ingredients_pkey" primary key ("recipe_id", "product_id"));');

    this.addSql('create table "user_products" ("user_id" uuid not null, "product_id" uuid not null, constraint "user_products_pkey" primary key ("user_id", "product_id"));');

    this.addSql('alter table "fridge_products" add constraint "fridge_products_fridge_id_foreign" foreign key ("fridge_id") references "fridge" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "fridge_products" add constraint "fridge_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "recipe" add constraint "recipe_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "recipe_ingredients" add constraint "recipe_ingredients_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipe_ingredients" add constraint "recipe_ingredients_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_products" add constraint "user_products_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_products" add constraint "user_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "fridge_products" drop constraint "fridge_products_fridge_id_foreign";');

    this.addSql('alter table "fridge_products" drop constraint "fridge_products_product_id_foreign";');

    this.addSql('alter table "recipe_ingredients" drop constraint "recipe_ingredients_product_id_foreign";');

    this.addSql('alter table "user_products" drop constraint "user_products_product_id_foreign";');

    this.addSql('alter table "recipe_ingredients" drop constraint "recipe_ingredients_recipe_id_foreign";');

    this.addSql('drop table if exists "fridge" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "fridge_products" cascade;');

    this.addSql('drop table if exists "recipe" cascade;');

    this.addSql('drop table if exists "recipe_ingredients" cascade;');

    this.addSql('drop table if exists "user_products" cascade;');
  }

}
