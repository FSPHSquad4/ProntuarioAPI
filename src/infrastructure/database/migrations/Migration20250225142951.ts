import { Migration } from "@mikro-orm/migrations";

export class Migration20250225142951 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `alter table \`patient\` modify \`companion_cpf\` varchar(11) not null;`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(
            `alter table \`patient\` modify \`companion_cpf\` varchar(255) not null;`,
        );
    }
}
