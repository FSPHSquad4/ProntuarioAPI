import { MikroORM, type Options } from "@mikro-orm/mariadb";
import { PatientRepository } from "@repositories/patient.repository";

export class Database {
    private static instance: MikroORM;
    public static repositories = {
        patient: null as PatientRepository | null,
    };

    static async connect(config: Options): Promise<MikroORM> {
        if (!Database.instance) {
            Database.instance = await MikroORM.init(config);

            Database.repositories.patient = new PatientRepository(
                Database.instance.em,
            );
        }
        return Database.instance;
    }

    static getInstance(): MikroORM {
        if (!Database.instance) {
            throw new Error("Database not initialized!");
        }
        return Database.instance;
    }

    static async close(): Promise<void> {
        if (Database.instance) {
            await Database.instance.close();
        }
    }
}
