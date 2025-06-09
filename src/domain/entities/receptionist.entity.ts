import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Roles } from "./user.entity.ts";

@Entity({ tableName: "receptionist" })
export class Receptionist {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({ unique: true })
    email!: string;

    @Property()
    password!: string;

    @Property()
    role: Roles = Roles.RECEPTIONIST;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
