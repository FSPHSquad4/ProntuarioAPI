import { Entity, Property } from "@mikro-orm/core";
import { Roles, User } from "./user.entity.ts";

@Entity()
export class Professional extends User {
    @Property()
    specialty!: string;

    @Property()
    professionalLicense!: string;

    constructor(
        name: string,
        email: string,
        password: string,
        specialty: string,
        professionalLicense: string,
    ) {
        super(name, email, password, Roles.PROFESSIONAL);
        this.specialty = specialty;
        this.professionalLicense = professionalLicense;
    }
}
