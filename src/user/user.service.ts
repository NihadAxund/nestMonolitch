import { Injectable } from '@nestjs/common';
import { User } from 'src/App.Entities/User/user.entity';

import { GenericRepository } from 'src/App.Core/DataAccess/GenericRepository'; // veya UserDal
import { DataSource } from 'typeorm';
import { IUserService } from 'src/App.Bussines/Abstaction/IUser.service';
import { UserResponseDto } from './Dtos/response-user.dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class UserService implements IUserService {
  private readonly userRepo: GenericRepository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepo = new GenericRepository<User>(this.dataSource, User);
  }

  async getAll(): Promise<User[]> {
    var result = await this.userRepo.findAll(); // this type User[]
    return result;
  }

  async getAllSelectedFields(): Promise<UserResponseDto[]>{
    var data = await this.userRepo.findAllSelectedFields(UserResponseDto, 'user');
      return plainToInstance (UserResponseDto, data, {
                excludeExtraneousValues: true,
              });
  }


  async getById(id: string): Promise<User> {
    const user = await this.userRepo.findOne(Number(id));
    if (!user) throw new Error('User not found');
    return user;
  }

  async create(entity: User): Promise<User> {
    return await this.userRepo.create(entity);
  }

  async update(id: string, entity: User): Promise<User> {
    // update metodu zaten bulunmayan id için exception fırlatır
    return await this.userRepo.update(Number(id), entity);
  }

  async delete(id: string): Promise<boolean> {
    await this.userRepo.delete(Number(id));
    return true;
  }
}
