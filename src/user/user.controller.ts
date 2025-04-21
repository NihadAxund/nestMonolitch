import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UpdateUserDto } from './Dtos/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/App.Entities/User/user.entity';
import { UserResponseDto } from './Dtos/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user') @ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    @ApiOkResponse({ type: [UserResponseDto] })
    async activeUser():Promise<UserResponseDto[]> {
        var result = await this.userService.getAllSelectedFields(); // this type User[]   
        console.log(result)
        return plainToInstance (UserResponseDto, result, {
            excludeExtraneousValues: true,
          });
    }

    @Post()
    createUser(@Body() user: User) {
        return this.userService.create(user);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: User) {
        return this.userService.update(id,user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }

}
