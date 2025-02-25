import { Container } from "inversify";
import { EntityManager, MikroORM } from "@mikro-orm/mariadb";
import { Database } from "@infrastructure/database/connection";
import { TYPES } from "@shared/constants/constants";
import { patientsModule } from "@infrastructure/injection/patients.module.container";

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

export { container };
