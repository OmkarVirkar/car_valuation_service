import { Body, Controller, Get, Post, Param, Query, Delete, Patch, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
// import { SerializeInterceptor } from '../interceptors/serialize.interceptors';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';

// @Serialize(UserDto) // Apply custom serializer interceptor to all routes from this controller
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Serialize(UserDto) // Apply custom serializer interceptor to this route
    @Post('/signup')
    signup(@Body() reqBody: CreateUserDto) {
        return this.authService.signup(reqBody.email, reqBody.password);
    }

    @Serialize(UserDto)
    @Post('/signin')
    signin(@Body() reqBody: CreateUserDto) {
        return this.authService.signin(reqBody.email, reqBody.password);
    }

    @Serialize(UserDto)
    @Post('/signout')
    signout() {
        return this.authService.signout();
    }

    @UseInterceptors(ClassSerializerInterceptor) // Apply interceptor to this route
    // @UseInterceptors(new SerializeInterceptor(UserDto)) // Apply custom serializer interceptor to this route
    @Serialize(UserDto) // Apply custom serializer interceptor to this route
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const userId = parseInt(id, 10); // Convert string to number
        const users = await this.usersService.findOne(userId);
        if (!users) {
            throw new NotFoundException('User not found');
        }
        return users;
    }

    @Get()
    async findAllUsers(@Query('email') email: string) {
        if (!email) {
            throw new Error('Email query parameter is required');
        }
        return await this.usersService.find(email);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        const userId = parseInt(id, 10); // Convert string to number
        return await this.usersService.delete(userId);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() reqBody: UpdateUserDto) {
        const userId = parseInt(id, 10); // Convert string to number
        return await this.usersService.update(userId, reqBody);
    }
}
