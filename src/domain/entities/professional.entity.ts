import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Roles } from "./user.entity.ts";

@Entity({ tableName: "professional" })
export class Professional {
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
    professionalLicense!: string;

    @Property()
    role: Roles = Roles.PROFESSIONAL;

    constructor(
        name: string,
        email: string,
        password: string,
        specialty: string,
        professionalLicense: string,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.specialty = specialty;
        this.professionalLicense = professionalLicense;
    }
}
