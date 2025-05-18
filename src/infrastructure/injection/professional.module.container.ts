import type { IProfessionalRepository } from "@domain/interfaces/repositories/professional.repository";
import type { EntityManager } from "@mikro-orm/mariadb";
import { ProfessionalRepository } from "@infrastructure/database/repositories/professional.repository";
import { TYPES } from "@shared/constants/constants";
import { ContainerModule } from "inversify";

export const professionalModule = new ContainerModule((bind) => {
    bind<IProfessionalRepository>(TYPES.ProfessionalRepository)
        .toDynamicValue((context) => {
            const em = context.container.get<EntityManager>(
                TYPES.EntityManager,
            );
            return new ProfessionalRepository(em);
        })
        .inRequestScope();
})
