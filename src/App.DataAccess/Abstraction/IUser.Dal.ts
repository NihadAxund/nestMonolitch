import { GenericRepositoryInterface } from "src/App.Core/DataAccess/TypeOrm/GenericRepositoryInterface";
import { User } from "src/App.Entities/User/user.entity";

export interface IUserDal extends GenericRepositoryInterface<User> {

}