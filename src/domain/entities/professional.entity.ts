import { Entity, Property } from "@mikro-orm/core";
import { Person } from "./person.entity";

@Entity()
export class Professional extends Person {
    @Property({ unique: true })
    register!: string;

    @Property()
    specialty!: string;

    @Property()
    contact!: string;

    @Property()
    availability!: string;
}
