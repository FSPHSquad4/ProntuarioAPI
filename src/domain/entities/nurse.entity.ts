import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Roles } from "./user.entity.ts";

@Entity({ tableName: "nurse" })
export class Nurse {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({ unique: true })
    email!: string;

    @Property()
    password!: string;

    @Property()
    specialty!: string;

    @Property()
    nurseLicense!: string;

    @Property()
    role: Roles = Roles.NURSE;

    constructor(
        name: string,
        email: string,
        password: string,
        specialty: string,
        nurseLicense: string,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.specialty = specialty;
        this.nurseLicense = nurseLicense;
    }
}
