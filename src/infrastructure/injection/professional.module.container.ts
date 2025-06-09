import type { IProfessionalRepository } from "@domain/interfaces/repositories/professional.irepository";
import type { EntityManager } from "@mikro-orm/mariadb";
import { ProfessionalRepository } from "@infrastructure/database/repositories/professional.repository";
import { TYPES } from "@shared/constants/constants";
import { ContainerModule } from "inversify";
import { CreateProfessionalService } from "@application/services/professionals/create-professional.service";
import { CreateProfessionalController } from "@application/controllers/professionals/create-professional.controller";
import { ListProfessionalsService } from "@application/services/professionals/list-professionals.service";

export const professionalModule = new ContainerModule((bind) => {
    bind<IProfessionalRepository>(TYPES.ProfessionalRepository)
        .toDynamicValue((context) => {
            const em = context.container.get<EntityManager>(
                TYPES.EntityManager,
            );
            return new ProfessionalRepository(em);
        })
        .inRequestScope();

    // Services

    bind<CreateProfessionalService>(TYPES.CreateProfessionalService)
        .to(CreateProfessionalService)
        .inSingletonScope();

    bind<ListProfessionalsService>(TYPES.ListProfessionalsService)
        .to(ListProfessionalsService)
        .inSingletonScope();

    // Controllers

    bind<CreateProfessionalController>(TYPES.CreateProfessionalController)
        .to(CreateProfessionalController)
        .inTransientScope();
});
