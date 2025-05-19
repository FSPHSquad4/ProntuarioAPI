import { Migration } from '@mikro-orm/migrations';

export class Migration20250519191842 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`professional\` (\`id\` bigint unsigned not null auto_increment primary key, \`created_at\` datetime null default CURRENT_TIMESTAMP, \`updated_at\` datetime null, \`full_name\` varchar(255) not null, \`birth_date\` date not null, \`gender\` char(1) not null, \`marital_status\` char(1) null, \`register\` varchar(255) not null, \`specialty\` varchar(255) not null, \`contact\` varchar(255) not null, \`availability\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`professional\` add unique \`professional_register_unique\`(\`register\`);`);

    this.addSql(`alter table \`patient\` modify \`marital_status\` char(1) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`professional\`;`);

    this.addSql(`alter table \`patient\` modify \`marital_status\` char(1) not null;`);
  }

}
