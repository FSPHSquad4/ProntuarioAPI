import type { DeletePatientController } from "@application/controllers/patients/delete-patient.controller";
import type { DeletePatientService } from "@application/services/patients/delete-patient.service";
import type { Patient } from "@domain/entities/patient.entity";
import { TYPES } from "@shared/constants/constants";
import { container } from "@infrastructure/injection/container";
import { AppError } from "@infrastructure/middlewares/handlers/errorHandler";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import type { Request, Response } from "express";

describe("DeletePatientController - Unit", () => {
    let mockService: DeletePatientService;
    let controller: DeletePatientController;

    beforeEach(() => {
        mockService = {
            execute: mock(() => Promise.resolve({ id: 1 } as Patient)),
        } as unknown as DeletePatientService;

        container.snapshot();

        container
            .rebind<DeletePatientService>(TYPES.DeletePatientService)
            .toConstantValue(mockService);

        controller = container.get<DeletePatientController>(
            TYPES.DeletePatientController,
        );
    });

    afterEach(() => {
        container.restore();
    });

    test("should return 204 on success", async () => {
        const req = {
            params: {
                id: 1,
            },
        } as unknown as Request;

        const res = {
            status: mock(() => res),
            json: mock(() => {}),
        } as unknown as Response;

        const next = mock(() => {});

        await controller.handle(req, res, next);

        expect(mockService.execute).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(204);
        expect(next).not.toHaveBeenCalled();
    });

    test("should call next with AppError on error", async () => {
        const req = {
            params: { id: 1 },
        } as unknown as Request;

        const res = {
            status: mock(() => res),
            json: mock(() => {}),
        } as unknown as Response;

        const next = mock(() => {});

        mockService.execute = mock(() => Promise.resolve(false));

        await controller.handle(req, res, next);

        expect(mockService.execute).toHaveBeenCalled();

        expect(next).toHaveBeenCalled();

        const calls = next.mock.calls;
        const errorArg = (calls[0] as unknown as [AppError])[0]; // Serve para pegar os dados do chamada mockada do `next` sem apitar erro de tupla

        expect(calls.length).toBeGreaterThan(0);
        expect(errorArg).toBeInstanceOf(AppError);
        expect(errorArg.message).toBe(
            "There was an error while removing the patient",
        );
        expect(errorArg.statusCode).toBe(422);
    });
});
