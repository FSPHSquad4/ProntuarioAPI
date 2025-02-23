import { Migration } from "@mikro-orm/migrations";

export class Migration20250222173309 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `create table \`patient\` (\`id\` bigint unsigned not null auto_increment primary key, \`full_name\` varchar(255) not null, \`cpf\` varchar(255) not null, \`gender\` varchar(255) not null, \`marital_status\` varchar(255) not null, \`companion_name\` varchar(255) not null, \`companion_cpf\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(`drop table if exists \`patient\`;`);
    }
}
