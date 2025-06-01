import { Container } from "inversify";
import { EntityManager, MikroORM } from "@mikro-orm/mariadb";
import { Database } from "@infrastructure/database/connection";
import { TYPES } from "@shared/constants/constants";
import { patientsModule } from "@infrastructure/injection/patients.module.container";
import { authModule } from "@infrastructure/injection/auth.module.container";
import { professionalModule } from "@infrastructure/injection/professional.module.container";

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

container.load(patientsModule);

container.load(authModule);

container.load(professionalModule);

export { container };
