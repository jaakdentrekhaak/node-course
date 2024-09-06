import { Migration } from '@mikro-orm/migrations';

export class Migration20240906121323 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "recipe_ingredients" cascade;');

    this.addSql('alter table "product" add column "recipe_id" uuid not null;');
    this.addSql('alter table "product" add constraint "product_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "recipe_ingredients" ("recipe_id" uuid not null, "product_id" uuid not null, constraint "recipe_ingredients_pkey" primary key ("recipe_id", "product_id"));');

    this.addSql('alter table "recipe_ingredients" add constraint "recipe_ingredients_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "recipe_ingredients" add constraint "recipe_ingredients_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "product" drop constraint "product_recipe_id_foreign";');

    this.addSql('alter table "product" drop column "recipe_id";');
  }

}
