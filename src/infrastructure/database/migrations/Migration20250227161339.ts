import { Migration } from "@mikro-orm/migrations";

export class Migration20250227161339 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `alter table \`patient\` modify \`companion_name\` varchar(255) null, modify \`companion_cpf\` varchar(11) null;`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(
            `alter table \`patient\` modify \`companion_name\` varchar(255) not null, modify \`companion_cpf\` varchar(11) not null;`,
        );
    }
}
