import { User } from "src/App.Entities/User/user.entity";

export interface IUserService{
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    create(entity: User): Promise<any>;
    update(id: string, entity: User): Promise<User>;
    delete(id: string): Promise<boolean>;
}