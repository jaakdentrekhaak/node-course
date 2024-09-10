import { Migration } from '@mikro-orm/migrations';

export class Migration20240910075811 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "product" add column "name" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "product" drop column "name";');
  }

}
