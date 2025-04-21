import { IEntity } from 'src/App.Entities/Abstraction/IEntity';
import { DeepPartial, EntityManager, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface GenericRepositoryInterface<T extends IEntity> {
  findAll(relations?: string[]): Promise<T[]>;
  findOne(id: number | string, relations?: string[]): Promise<T>;
  create(entity: DeepPartial<T>): Promise<T>;
  update(id: number | string, entity: QueryDeepPartialEntity<T>): Promise<T>;
  delete(id: number | string): Promise<void>;
  withTransaction<R>(fn: (manager: EntityManager) => Promise<R>): Promise<R>;
}
