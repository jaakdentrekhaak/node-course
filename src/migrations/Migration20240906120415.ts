import { Migration } from '@mikro-orm/migrations';

export class Migration20240906120415 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "fridge_products" cascade;');

    this.addSql('drop table if exists "user_products" cascade;');

    this.addSql('alter table "product" add column "user_id" uuid not null, add column "fridge_id" uuid not null;');
    this.addSql('alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "product" add constraint "product_fridge_id_foreign" foreign key ("fridge_id") references "fridge" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "fridge_products" ("fridge_id" uuid not null, "product_id" uuid not null, constraint "fridge_products_pkey" primary key ("fridge_id", "product_id"));');

    this.addSql('create table "user_products" ("user_id" uuid not null, "product_id" uuid not null, constraint "user_products_pkey" primary key ("user_id", "product_id"));');

    this.addSql('alter table "fridge_products" add constraint "fridge_products_fridge_id_foreign" foreign key ("fridge_id") references "fridge" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "fridge_products" add constraint "fridge_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_products" add constraint "user_products_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_products" add constraint "user_products_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "product" drop constraint "product_user_id_foreign";');
    this.addSql('alter table "product" drop constraint "product_fridge_id_foreign";');

    this.addSql('alter table "product" drop column "user_id";');
    this.addSql('alter table "product" drop column "fridge_id";');
  }

}
