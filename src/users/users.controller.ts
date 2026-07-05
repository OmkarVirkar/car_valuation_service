import { Body, Controller, Get, Post, Param, Query, Delete, Patch, NotFoundException, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
// import { SerializeInterceptor } from '../interceptors/serialize.interceptors';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './users.entity';

@Serialize(UserDto) // Apply custom serializer interceptor to all routes from this controller
// @UseInterceptors(CurrentUserInterceptor) // Apply the CurrentUserInterceptor to all routes from this controller
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Get('/whoami')
    whoAmI(@CurrentUser() currentUser: User) {
        return currentUser;
    }

    @Serialize(UserDto)
    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null;
        return;
    }

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
        return session.color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
    }

    @Serialize(UserDto) // Apply custom serializer interceptor to this route
    @Post('/signup')
    async signup(@Body() reqBody: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(reqBody.email, reqBody.password);
        session.userId = user.id; // Store the user ID in the session
        return user;

    }

    @Serialize(UserDto)
    @Post('/signin')
    async signin(@Body() reqBody: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(reqBody.email, reqBody.password);
        session.userId = user.id; // Store the user ID in the session
        return user;
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
