import type { BaseEntity } from "@domain/entities/base.entity";
import type { IBaseRepository } from "@domain/interfaces/repositories/base.irepository";
import {
    EntityManager,
    EntityRepository,
    type FilterQuery,
    type RequiredEntityData,
} from "@mikro-orm/mariadb";

export abstract class BaseRepository<T extends BaseEntity>
    extends EntityRepository<T>
    implements IBaseRepository<T>
{
    constructor(em: EntityManager, entityName: string) {
        super(em, entityName);
    }

    async listAll(): Promise<T[]> {
        return this.em.findAll(this.entityName);
    }

    async add(data: RequiredEntityData<T>): Promise<T> {
        const entity = this.em.create(this.entityName, data);
        await this.em.persistAndFlush(entity);
        return entity;
    }

    async findById(id: number): Promise<T | null> {
        return this.em.findOne(this.entityName, { id } as FilterQuery<
            NoInfer<T>
        >);
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const entity = await this.findById(id);
        if (!entity) return null;

        Object.assign(entity, data);
        await this.em.flush();
        return entity;
    }

    async delete(id: number): Promise<boolean> {
        const entity = await this.findById(id);
        if (!entity) return false;

        await this.em.removeAndFlush(entity);
        return true;
    }
}
