import { Entity, Enum, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity.ts";
import { UserRole } from "../../shared/enums/userRoles.ts";

@Entity()
@Unique({ properties: ["email", "username"] })
export class User extends BaseEntity {
    @Property()
    @Unique()
    email!: string;

    @Property()
    @Unique()
    username!: string;

    @Property()
    passwordHash!: string;

    @Enum(() => UserRole)
    role!: UserRole;
}
