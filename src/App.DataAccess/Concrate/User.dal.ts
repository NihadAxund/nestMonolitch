import { Injectable } from "@nestjs/common";
import { GenericRepository } from "src/App.Core/DataAccess/GenericRepository";
import { User } from "src/App.Entities/User/user.entity";
import { DataSource } from "typeorm";
@Injectable()
export class UserDal extends GenericRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }
}
