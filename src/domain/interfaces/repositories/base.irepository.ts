import type { RequiredEntityData } from "@mikro-orm/core";

export interface IBaseRepository<T> {
    listAll(): Promise<T[]>;
    add(data: RequiredEntityData<T>): Promise<T>;
    findById(id: number): Promise<T | null>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}
