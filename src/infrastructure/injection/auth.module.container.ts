import { LoginController } from "@application/controllers/auth/login.controller";
import { LoginService } from "@application/services/auth/login.service";
import type { IUserRepository } from "@domain/interfaces/repositories/user.repository";
import { UserRepository } from "@infrastructure/database/repositories/user.repository";
import { EntityManager } from "@mikro-orm/mariadb";
import { TYPES } from "@shared/constants/constants";
import { ContainerModule } from "inversify";

export const authModule = new ContainerModule((bind) => {
    bind<IUserRepository>(TYPES.UserRepository)
        .toDynamicValue((context) => {
            const em = context.container.get<EntityManager>(
                TYPES.EntityManager,
            );
            return new UserRepository(em);
        })
        .inRequestScope();

    // Services

    bind<LoginService>(TYPES.LoginService).to(LoginService).inSingletonScope();

    // Controllers

    bind<LoginController>(TYPES.LoginController)
        .to(LoginController)
        .inTransientScope();
});
