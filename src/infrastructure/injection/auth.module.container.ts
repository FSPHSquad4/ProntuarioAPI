import { LoginController } from "@application/controllers/auth/login.controller";
import { LoginService } from "@application/services/auth/login.service";
import { GenericUserRepository } from "@infrastructure/database/repositories/generic-user.repository";
import { TYPES } from "@shared/constants/constants";
import { ContainerModule } from "inversify";

export const authModule = new ContainerModule((bind) => {
    bind<GenericUserRepository>(TYPES.GenericUserRepository)
        .to(GenericUserRepository)
        .inRequestScope();

    // Services
    bind<LoginService>(TYPES.LoginService).to(LoginService).inSingletonScope();

    // Controllers
    bind<LoginController>(TYPES.LoginController)
        .to(LoginController)
        .inTransientScope();
});
