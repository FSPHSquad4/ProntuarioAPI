import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity.ts";

@Entity()
export class Patient extends BaseEntity {
    @Property()
    fullName!: string;

    @Property({ unique: true })
    cpf!: string;

    @Property()
    gender!: string;

    @Property()
    maritalStatus!: string;

    @Property()
    companionName!: string;

    @Property()
    companionCpf!: string;
}
