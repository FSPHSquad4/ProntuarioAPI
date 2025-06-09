import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Patient } from "./patient.entity";
import { Receptionist } from "./receptionist.entity";
import { Professional } from "./professional.entity";

export enum ConsultationStatus {
    SCHEDULED = "scheduled",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    NO_SHOW = "no-show",
}

@Entity({ tableName: "booking" })
export class Booking extends BaseEntity {
    @ManyToOne(() => Patient)
    patient!: Patient;

    @ManyToOne(() => Receptionist, { nullable: true })
    receptionist?: Receptionist;

    @ManyToOne(() => Professional)
    professional!: Professional;

    @Property()
    consultationDate!: Date;

    @Enum(() => ConsultationStatus)
    consultationStatus: ConsultationStatus = ConsultationStatus.SCHEDULED;

    @Property({ nullable: true })
    notes?: string;
}
