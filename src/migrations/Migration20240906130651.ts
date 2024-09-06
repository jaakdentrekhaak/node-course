import { Migration } from '@mikro-orm/migrations';

export class Migration20240906130651 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "fridge" alter column "capacity" type int using ("capacity"::int);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "fridge" alter column "capacity" type varchar(255) using ("capacity"::varchar(255));');
  }

}
