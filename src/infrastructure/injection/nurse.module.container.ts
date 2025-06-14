import type { INurseRepository } from "@domain/interfaces/repositories/nurse.irepository";
import type { EntityManager } from "@mikro-orm/mariadb";
import { NurseRepository } from "@infrastructure/database/repositories/nurse.repository";
import { TYPES } from "@shared/constants/constants";
import { ContainerModule } from "inversify";
import { CreateNurseService } from "@application/services/nurse/create-nurse.service";
import { CreateNurseController } from "@application/controllers/nurse/create-nurse.controller";
import { ListNurseService } from "@application/services/nurse/list-nurse.service";
import { ListNurseController } from "@application/controllers/nurse/list-nurse.controller";

export const nurseModule = new ContainerModule((bind) => {
    bind<INurseRepository>(TYPES.NurseRepository)
        .toDynamicValue((context) => {
            const em = context.container.get<EntityManager>(
                TYPES.EntityManager,
            );
            return new NurseRepository(em);
        })
        .inRequestScope();

    // Services

    bind<CreateNurseService>(TYPES.CreateNurseService)
        .to(CreateNurseService)
        .inSingletonScope();

    bind<ListNurseService>(TYPES.ListNurseService)
        .to(ListNurseService)
        .inSingletonScope();

    // Controllers

    bind<CreateNurseController>(TYPES.CreateNurseController)
        .to(CreateNurseController)
        .inTransientScope();

    bind<ListNurseController>(TYPES.ListNurseController)
        .to(ListNurseController)
        .inSingletonScope();
});
