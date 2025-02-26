import type { UpdatePatientController } from "@application/controllers/patients/update-patient.controller";
import type { UpdatePatientService } from "@application/services/patients/update-patient.service";
import type { Patient } from "@domain/entities/patient.entity";
import { TYPES } from "@shared/constants/constants";
import { container } from "@shared/injection/container";
import { mock, beforeEach, describe, afterEach, test, expect } from "bun:test";
import type { Request, Response } from "express";

describe("UpdatePatientController - Unit", () => {
    let mockService: UpdatePatientService;
    let controller: UpdatePatientController;

    beforeEach(() => {
        mockService = {
            execute: mock(() => Promise.resolve({ id: 1 } as Patient)),
        } as unknown as UpdatePatientService;

        container.snapshot();

        container
            .rebind<UpdatePatientService>(TYPES.UpdatePatientService)
            .toConstantValue(mockService);

        controller = container.get<UpdatePatientController>(
            TYPES.UpdatePatientController,
        );
    });

    afterEach(() => {
        container.restore();
    });

    test("should return 200 on success", async () => {
        const req = {
            params: {
                id: 1,
            },
            body: {
                fullName: "Zé da Silva",
                birthDate: "14/03/2005",
            },
        } as unknown as Request;

        const res = {
            status: mock(() => res),
            json: mock(() => {}),
        } as unknown as Response;

        const next = mock(() => {});

        await controller.handle(req, res, next);

        expect(mockService.execute).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
        expect(next).not.toHaveBeenCalled();
    });
});
