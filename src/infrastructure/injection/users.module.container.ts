import { CreateUserController } from "@application/controllers/users/create-user.controller";
import { CreateUserService } from "@application/services/users/create-user.service";
import { TYPES } from "@shared/constants/constants";
import { ContainerModule } from "inversify";

export const usersModule = new ContainerModule((bind) => {
    bind<CreateUserService>(TYPES.CreateUserService)
        .to(CreateUserService)
        .inSingletonScope();

    bind<CreateUserController>(TYPES.CreateUserController)
        .to(CreateUserController)
        .inTransientScope();
});
