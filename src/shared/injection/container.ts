import { Container } from "inversify";
import { PatientRepository } from "@repositories/patient.repository";
import { EntityManager, MikroORM } from "@mikro-orm/mariadb";
import { Database } from "@infrastructure/database/connection";
import { TYPES } from "@shared/constants/constants";
import { ListPatientsService } from "@application/services/patients/list-patients.service";
import { CreatePatientController } from "@application/controllers/patients/create-patient.controller";
import type { IPatientRepository } from "@domain/interfaces/repositories/patient.repository";
import { ListPatientsController } from "@application/controllers/patients/list-patients.controller";
import { CreatePatientService } from "@application/services/patients/create-patient.service";

const container = new Container();

container
    .bind<MikroORM>(TYPES.MikroORM)
    .toDynamicValue(() => Database.getInstance())
    .inSingletonScope();

container
    .bind<EntityManager>(TYPES.EntityManager)
    .toDynamicValue((context) => {
        const orm = context.container.get<MikroORM>(TYPES.MikroORM);
        return orm.em.fork();
    })
    .inRequestScope();

container
    .bind<IPatientRepository>(TYPES.PatientRepository)
    .toDynamicValue((context) => {
        const em = context.container.get<EntityManager>(TYPES.EntityManager);
        return new PatientRepository(em);
    })
    .inRequestScope();

container
    .bind<ListPatientsService>(TYPES.ListPatientsService)
    .to(ListPatientsService)
    .inSingletonScope();

container
    .bind<CreatePatientService>(TYPES.CreatePatientService)
    .to(CreatePatientService)
    .inSingletonScope();

container
    .bind<ListPatientsController>(TYPES.ListPatientsController)
    .to(ListPatientsController)
    .inTransientScope();

container
    .bind<CreatePatientController>(TYPES.CreatePatientController)
    .to(CreatePatientController)
    .inTransientScope();

export { container };
