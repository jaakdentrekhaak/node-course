import { Migration } from '@mikro-orm/migrations';

export class Migration20240906135434 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_user_id_foreign";');

    this.addSql('alter table "product" alter column "user_id" drop default;');
    this.addSql('alter table "product" alter column "user_id" type uuid using ("user_id"::text::uuid);');
    this.addSql('alter table "product" alter column "user_id" drop not null;');
    this.addSql('alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop constraint "product_user_id_foreign";');

    this.addSql('alter table "product" alter column "user_id" drop default;');
    this.addSql('alter table "product" alter column "user_id" type uuid using ("user_id"::text::uuid);');
    this.addSql('alter table "product" alter column "user_id" set not null;');
    this.addSql('alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
