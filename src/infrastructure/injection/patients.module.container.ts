import { ContainerModule } from "inversify";
import { PatientRepository } from "@repositories/patient.repository";
import { ListPatientsService } from "@application/services/patients/list-patients.service";
import { CreatePatientController } from "@application/controllers/patients/create-patient.controller";
import type { IPatientRepository } from "@domain/interfaces/repositories/patient.irepository";
import { ListPatientsController } from "@application/controllers/patients/list-patients.controller";
import { CreatePatientService } from "@application/services/patients/create-patient.service";
import { TYPES } from "@shared/constants/constants";
import type { EntityManager } from "@mikro-orm/mariadb";
import { UpdatePatientService } from "@application/services/patients/update-patient.service";
import { UpdatePatientController } from "@application/controllers/patients/update-patient.controller";
import { DeletePatientService } from "@application/services/patients/delete-patient.service";
import { DeletePatientController } from "@application/controllers/patients/delete-patient.controller";

export const patientsModule = new ContainerModule((bind) => {
    bind<IPatientRepository>(TYPES.PatientRepository)
        .toDynamicValue((context) => {
            const em = context.container.get<EntityManager>(
                TYPES.EntityManager,
            );
            return new PatientRepository(em);
        })
        .inRequestScope();

    // Services

    bind<ListPatientsService>(TYPES.ListPatientsService)
        .to(ListPatientsService)
        .inSingletonScope();

    bind<CreatePatientService>(TYPES.CreatePatientService)
        .to(CreatePatientService)
        .inSingletonScope();

    bind<UpdatePatientService>(TYPES.UpdatePatientService)
        .to(UpdatePatientService)
        .inSingletonScope();

    bind<DeletePatientService>(TYPES.DeletePatientService)
        .to(DeletePatientService)
        .inSingletonScope();

    // Controllers

    bind<ListPatientsController>(TYPES.ListPatientsController)
        .to(ListPatientsController)
        .inTransientScope();

    bind<CreatePatientController>(TYPES.CreatePatientController)
        .to(CreatePatientController)
        .inTransientScope();

    bind<UpdatePatientController>(TYPES.UpdatePatientController)
        .to(UpdatePatientController)
        .inTransientScope();

    bind<DeletePatientController>(TYPES.DeletePatientController)
        .to(DeletePatientController)
        .inTransientScope();
});
