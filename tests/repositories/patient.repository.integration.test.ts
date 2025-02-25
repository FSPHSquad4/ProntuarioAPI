import { Patient } from "@domain/entities/patient.entity";
import { Database } from "@infrastructure/database/connection";
import { PatientRepository } from "@infrastructure/database/repositories/patient.repository";
import type { EntityManager } from "@mikro-orm/mariadb";
import { test, beforeEach, describe, expect, afterEach } from "bun:test";

describe("PatientRepository - Integration", () => {
    let em: EntityManager;
    let repository: PatientRepository;

    beforeEach(async () => {
        em = Database.getInstance().em.fork();
        await em.begin();

        repository = new PatientRepository(em);
    });

    afterEach(async () => {
        await em.commit(); // Nota do Pedrão: ele commita cada transação do test(), então quando criar um paciente, ele permanece no banco até o fim do teste
    });

    test("should add a new patient", async () => {
        const patientData = {
            fullName: "João Silva",
            cpf: "12345678900",
            birthDate: "01/01/1990",
            gender: "M",
            maritalStatus: "S",
            companionName: "Maria Silva",
            companionCpf: "98765432100",
        };

        const patient = await repository.add(patientData);

        expect(patient.id).toBeDefined();
        expect(patient.birthDate).toBeInstanceOf(Date);
        expect(patient.birthDate).toEqual(new Date(patientData.birthDate));
        expect(patient.createdAt).toBeInstanceOf(Date);
    });

    test("should list all patients", async () => {
        const patients = await repository.listAll();

        expect(patients).toBeArray();
        expect(patients).toHaveLength(1);
        expect(patients[0]).toBeInstanceOf(Patient);
    });

    test("should find a patient by CPF", async () => {
        const cpf = "12345678900";
        const patient = await repository.findByCpf(cpf);

        expect(patient).toBeDefined();
        expect(patient?.cpf).toEqual(cpf);
    });

    test("should delete a patient", async () => {
        const patient = await repository.findById(1);
        const deleted = await repository.delete(patient!.id);

        expect(deleted).toBe(true);

        const patients = await repository.listAll();
        expect(patients).toHaveLength(0);
    });
});
