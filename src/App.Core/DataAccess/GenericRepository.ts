import {
    DataSource,
    Repository,
    EntityManager,
    DeepPartial,
    EntityTarget,
    ObjectLiteral,
  } from 'typeorm';
  import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
  import { Injectable } from '@nestjs/common';
import { IEntity } from 'src/App.Entities/Abstraction/IEntity';
import { GenericRepositoryInterface } from './TypeOrm/GenericRepositoryInterface';

import { ClassConstructor } from 'class-transformer/types/interfaces';
import { instanceToPlain } from 'class-transformer';

export  function getExposedProperties<T>(dto: ClassConstructor<T>): string[] {
  const dummy = new dto();
  const plain = instanceToPlain(dummy, {
    exposeUnsetFields: true,
    excludeExtraneousValues: true,
  });
  return Object.keys(plain);
}



  @Injectable()
  export class GenericRepository<T extends IEntity & ObjectLiteral>
    implements GenericRepositoryInterface<T>
  {
    protected readonly repository: Repository<T>;
  
    constructor(
      protected readonly dataSource: DataSource,
      private readonly entity: EntityTarget<T>,
    ) {
      this.repository = this.dataSource.getRepository(this.entity);
    }

    async findAllSelectedFields<D>(
      dto: new () => D,
      alias = 'entity', 
    ): Promise<Partial<T>[]> {
      const exposedFields = getExposedProperties(dto);
      const selectFields = exposedFields.map((field) => `${alias}.${field}`);

      return await this.repository.createQueryBuilder(alias).select(selectFields).getMany();
    }
    
  
    async findAll(relations: string[] = []): Promise<T[]> {
      return await this.repository.find({ relations });
    }
  
    async findOne(id: string| number, relations: string[] = []): Promise<T> {
      return await this.repository.findOneOrFail({ where: { id } as any, relations });
    }
  
    async create(entity: DeepPartial<T>): Promise<T> {
      const instance = this.repository.create(entity);
      return await this.repository.save(instance);
    }
  
    async update(id: string| number, entity: QueryDeepPartialEntity<T>): Promise<T> {
      await this.repository.update(id, entity);
      return this.findOne(id);
    }
  
    async delete(id: string| number): Promise<void> {
      await this.repository.delete(id);
    }
  
    withTransaction<R>(fn: (manager: EntityManager) => Promise<R>): Promise<R> {
      return this.dataSource.manager.transaction(fn);
    }

  }
  