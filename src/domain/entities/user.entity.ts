import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";

export enum Roles {
    ADMIN = "ADMIN",
    PROFESSIONAL = "PROFESSIONAL",
    NURSE = "NURSE",
    RECEPTIONIST = "RECEPTIONIST",
}

@Entity({ discriminatorColumn: "role", abstract: true })
export abstract class User {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({ unique: true })
    email!: string;

    @Property()
    password!: string;

    @Enum({ items: () => Roles, type: "string" })
    role!: Roles;

    constructor(name: string, email: string, password: string, role: Roles) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
