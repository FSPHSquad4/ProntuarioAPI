import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity.ts";

@Entity()
export class Patient extends BaseEntity {
    @Property()
    fullName!: string;

    @Property({ unique: true, length: 11 })
    cpf!: string;

    @Property({ type: "date" })
    birthDate!: Date;

    @Property({ length: 1, type: "char" })
    gender!: string;

    @Property({ length: 1, type: "char" })
    maritalStatus!: string;

    @Property()
    companionName!: string;

    @Property({ length: 11 })
    companionCpf!: string;
}
