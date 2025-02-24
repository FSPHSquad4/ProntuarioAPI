import { Patient } from "@domain/entities/patient.entity";
import { Database } from "@infrastructure/database/connection";
import type { EntityManager } from "@mikro-orm/mariadb";
import { test, beforeEach, describe, expect } from "bun:test";

describe("PatientRepository", () => {
    let em: EntityManager;

    beforeEach(async () => {
        em = Database.getInstance().em.fork();
        await em.begin();
        await em.nativeDelete(Patient, {});
    });

    test("should create a new patient", async () => {
        const repository = em.getRepository(Patient);

        const patient = repository.create({
            fullName: "João Silva",
            cpf: "12345678900",
            gender: "M",
            maritalStatus: "S",
            companionName: "Maria Silva",
            companionCpf: "98765432100",
        });

        await em.persistAndFlush(patient);
        expect(patient.id).toBeDefined();
        expect(patient.createdAt).toBeInstanceOf(Date);
    });
});
