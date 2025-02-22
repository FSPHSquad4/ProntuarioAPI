import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Patient {
    @PrimaryKey({ type: "bigint" })
    id!: number;

    @Property()
    fullName!: string;

    @Property()
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
