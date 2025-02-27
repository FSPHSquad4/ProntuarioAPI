import { Entity, Property } from "@mikro-orm/core";
import { Person } from "./person.entity.ts";

@Entity()
export class Patient extends Person {
    @Property({ unique: true, length: 11 })
    cpf!: string;

    @Property()
    companionName?: string;

    @Property({ length: 11 })
    companionCpf?: string;
}
