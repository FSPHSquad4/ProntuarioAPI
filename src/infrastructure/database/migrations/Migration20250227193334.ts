import { Migration } from "@mikro-orm/migrations";

export class Migration20250227193334 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `create table \`user\` (\`id\` bigint unsigned not null auto_increment primary key, \`created_at\` datetime null default CURRENT_TIMESTAMP, \`updated_at\` datetime null, \`email\` varchar(255) not null, \`username\` varchar(255) not null, \`password_hash\` varchar(255) not null, \`role\` tinyint not null) default character set utf8mb4 engine = InnoDB;`,
        );
        this.addSql(
            `alter table \`user\` add unique \`user_email_unique\`(\`email\`);`,
        );
        this.addSql(
            `alter table \`user\` add unique \`user_username_unique\`(\`username\`);`,
        );
        this.addSql(
            `alter table \`user\` add unique \`user_email_username_unique\`(\`email\`, \`username\`);`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(`drop table if exists \`user\`;`);
    }
}
