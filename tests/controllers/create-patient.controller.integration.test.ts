import type { CreatePatientController } from "@application/controllers/patients/create-patient.controller";
import { createPatientSchema } from "@domain/schemas/patient.schema";
import { validateSchema } from "@shared/middlewares/validateSchema";
import { describe, expect, mock, test } from "bun:test";
import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";

const fakeController = {
    handle: mock(() => Promise.resolve()),
} as unknown as CreatePatientController;

describe("CreatePatientController - Validation - Integration", () => {
    test("should return 400 with validation errors if payload is invalid", async () => {
        const req = {
            body: {
                fullName: "Test",
                cpf: "123456789",
                birthDate: "31+02+2000",
                gender: "M",
                maritalStatus: "S",
                companionName: "Test Companion",
                companionCpf: "45693685211",
            },
        } as Request;

        let statusCode: number | undefined;
        let responseBody: ZodError | undefined;

        const res = {
            status: mock((status: number) => {
                statusCode = status;
                return res;
            }),
            json: mock((body: object) => {
                responseBody = body as ZodError;
                return res;
            }),
        } as unknown as Response;

        const next: NextFunction = mock(() => {});

        validateSchema(createPatientSchema)(req, res, next);

        expect(statusCode).toBe(400);
        expect(responseBody).toHaveProperty("errors");
        expect(responseBody!.errors).toContain("Invalid date format");
        expect(responseBody!.errors).toContain("Send a valid CPF.");
    });

    test("should call controller if payload is valid", async () => {
        const req = {
            body: {
                fullName: "Test User",
                cpf: "12345678910",
                birthDate: "22/01/2002",
                gender: "M",
                maritalStatus: "S",
                companionName: "Test Companion",
                companionCpf: "09876543210",
            },
        } as Request;

        const res = {
            status: mock(() => res),
            json: mock(() => {}),
        } as unknown as Response;

        let nextCalled = false;
        const next: NextFunction = () => {
            nextCalled = true;
        };

        await new Promise<void>((resolve) => {
            validateSchema(createPatientSchema)(req, res, (err) => {
                if (!err) {
                    fakeController.handle(req, res, next).then(() => resolve());
                } else {
                    resolve();
                }
            });
        });

        expect(fakeController.handle).toHaveBeenCalled();
        expect(nextCalled).toBe(false);
    });
});
