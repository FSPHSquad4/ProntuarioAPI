import { CreatePatientController } from "@application/controllers/patients/create-patient.controller";
import { CreatePatientService } from "@application/services/patients/create-patient.service";
import type { Patient } from "@domain/entities/patient.entity";
import { TYPES } from "@shared/constants/constants";
import { container } from "@shared/injection/container";
import { test, mock, beforeEach, describe, expect, afterEach } from "bun:test";
import type { NextFunction, Request, Response } from "express";

describe("CreatePatientController", () => {
    let mockService: CreatePatientService;
    let controller: CreatePatientController;

    beforeEach(() => {
        mockService = {
            execute: mock(() => Promise.resolve({ id: 1 } as Patient)),
        } as unknown as CreatePatientService;

        container.snapshot();

        container
            .rebind<CreatePatientService>(TYPES.CreatePatientService)
            .toConstantValue(mockService);

        controller = container.get<CreatePatientController>(
            TYPES.CreatePatientController,
        );
    });

    afterEach(() => {
        container.restore();
    });

    test("should return 201 on success", async () => {
        const req = {
            body: {
                fullName: "Test",
                cpf: "123",
                gender: "M",
                maritalStatus: "S",
                companionName: "Test",
                companionCpf: "456",
            },
        } as Request;

        const res = {
            status: mock(() => res),
            json: mock(() => {}),
        } as unknown as Response;

        const next: NextFunction = mock(() => {});

        await controller.handle(req, res, next);

        expect(mockService.execute).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });
});
