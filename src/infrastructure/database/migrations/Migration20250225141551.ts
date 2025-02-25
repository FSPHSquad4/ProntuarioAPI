import { Migration } from "@mikro-orm/migrations";

export class Migration20250225141551 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `alter table \`patient\` add \`birth_date\` date not null;`,
        );
        this.addSql(
            `alter table \`patient\` modify \`created_at\` datetime null default CURRENT_TIMESTAMP, modify \`cpf\` varchar(11) not null, modify \`gender\` char(1) not null, modify \`marital_status\` char(1) not null;`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(`alter table \`patient\` drop column \`birth_date\`;`);

        this.addSql(
            `alter table \`patient\` modify \`created_at\` datetime not null default CURRENT_TIMESTAMP, modify \`cpf\` varchar(255) not null, modify \`gender\` varchar(255) not null, modify \`marital_status\` varchar(255) not null;`,
        );
    }
}
