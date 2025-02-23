import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
    @PrimaryKey({ type: "bigint", autoincrement: true })
    id!: number;

    @Property({ defaultRaw: "CURRENT_TIMESTAMP" })
    createdAt?: Date = new Date();

    @Property({
        onUpdate: () => new Date(),
        nullable: true,
    })
    updatedAt?: Date;
}
