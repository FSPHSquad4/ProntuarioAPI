import { Migration } from "@mikro-orm/migrations";

export class Migration20250223145144 extends Migration {
    override async up(): Promise<void> {
        this.addSql(
            `alter table \`patient\` add \`created_at\` datetime not null default CURRENT_TIMESTAMP, add \`updated_at\` datetime null;`,
        );
        this.addSql(
            `alter table \`patient\` add unique \`patient_cpf_unique\`(\`cpf\`);`,
        );
    }

    override async down(): Promise<void> {
        this.addSql(
            `alter table \`patient\` drop index \`patient_cpf_unique\`;`,
        );
        this.addSql(
            `alter table \`patient\` drop column \`created_at\`, drop column \`updated_at\`;`,
        );
    }
}
