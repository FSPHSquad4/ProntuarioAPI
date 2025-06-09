import type { IReceptionistRepository } from "@domain/interfaces/repositories/receptionist.irepository";
import type { EntityManager } from "@mikro-orm/mariadb";
import { ReceptionistRepository } from "@infrastructure/database/repositories/receptionist.repository";
import { TYPES } from "@shared/constants/constants";
import { ContainerModule } from "inversify";
import { CreateReceptionistService } from "@application/services/receptionists/create-receptionist.service";
import { CreateReceptionistController } from "@application/controllers/receptionists/create-receptionist.controller";

export const receptionistModule = new ContainerModule((bind) => {
    bind<IReceptionistRepository>(TYPES.ReceptionistRepository)
        .toDynamicValue((context) => {
            const em = context.container.get<EntityManager>(
                TYPES.EntityManager,
            );
            return new ReceptionistRepository(em);
        })
        .inRequestScope();

    // Services

    bind<CreateReceptionistService>(TYPES.CreateReceptionistService)
        .to(CreateReceptionistService)
        .inSingletonScope();

    // Controllers

    bind<CreateReceptionistController>(TYPES.CreateReceptionistController)
        .to(CreateReceptionistController)
        .inTransientScope();
});
