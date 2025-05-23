import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity.ts";

@Entity({ abstract: true })
export abstract class Person extends BaseEntity {
    @Property()
    fullName!: string;

    @Property({ type: "date" })
    birthDate!: Date;

    @Property({ length: 1, type: "char" })
    gender!: string;

    @Property({ length: 1, type: "char" })
    maritalStatus?: string;
}
