import { Migration } from '@mikro-orm/migrations';

export class Migration20240906124741 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_fridge_id_foreign";');
    this.addSql('alter table "product" drop constraint "product_recipe_id_foreign";');

    this.addSql('alter table "product" alter column "fridge_id" drop default;');
    this.addSql('alter table "product" alter column "fridge_id" type uuid using ("fridge_id"::text::uuid);');
    this.addSql('alter table "product" alter column "fridge_id" drop not null;');
    this.addSql('alter table "product" alter column "recipe_id" drop default;');
    this.addSql('alter table "product" alter column "recipe_id" type uuid using ("recipe_id"::text::uuid);');
    this.addSql('alter table "product" alter column "recipe_id" drop not null;');
    this.addSql('alter table "product" add constraint "product_fridge_id_foreign" foreign key ("fridge_id") references "fridge" ("id") on update cascade on delete set null;');
    this.addSql('alter table "product" add constraint "product_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_fridge_id_foreign";');
    this.addSql('alter table "product" drop constraint "product_recipe_id_foreign";');

    this.addSql('alter table "product" alter column "fridge_id" drop default;');
    this.addSql('alter table "product" alter column "fridge_id" type uuid using ("fridge_id"::text::uuid);');
    this.addSql('alter table "product" alter column "fridge_id" set not null;');
    this.addSql('alter table "product" alter column "recipe_id" drop default;');
    this.addSql('alter table "product" alter column "recipe_id" type uuid using ("recipe_id"::text::uuid);');
    this.addSql('alter table "product" alter column "recipe_id" set not null;');
    this.addSql('alter table "product" add constraint "product_fridge_id_foreign" foreign key ("fridge_id") references "fridge" ("id") on update cascade;');
    this.addSql('alter table "product" add constraint "product_recipe_id_foreign" foreign key ("recipe_id") references "recipe" ("id") on update cascade;');
  }

}
