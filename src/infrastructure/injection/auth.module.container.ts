import { LoginController } from "@application/controllers/auth/login.controller";
import { LoginService } from "@application/services/auth/login.service";
import type { IGenericUserRepository } from "@domain/interfaces/repositories/generic-user.irepository";
import { GenericUserRepository } from "@infrastructure/database/repositories/generic-user.repository";
import type { EntityManager } from "@mikro-orm/mariadb";
import { TYPES } from "@shared/constants/constants";
import { ContainerModule } from "inversify";

export const authModule = new ContainerModule((bind) => {
    bind<IGenericUserRepository>(TYPES.GenericUserRepository)
        .toDynamicValue((context) => {
            const em = context.container.get<EntityManager>(
                TYPES.EntityManager,
            );
            return new GenericUserRepository(em);
        })
        .inRequestScope();
    // Services
    bind<LoginService>(TYPES.LoginService).to(LoginService).inSingletonScope();

    // Controllers
    bind<LoginController>(TYPES.LoginController)
        .to(LoginController)
        .inTransientScope();
});
