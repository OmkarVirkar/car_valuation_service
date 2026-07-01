import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signup(email: string, password: string) {
        // see If email is in use
        const user = await this.userService.find(email);
        if(user.length) {
            throw new BadRequestException('Email in use');
        }
        // Hash the password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        // Create a new user and save it
        const newUser = await this.userService.create(email, result);
        // Return the user
        return newUser;
    }

    async signin(email: string, password: string) {
        // Logic for signing in a user
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new BadRequestException('Invalid email');
        }
        // Compare the provided password with the stored hash
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (hash.toString('hex') !== storedHash) {
            throw new BadRequestException('Invalid password');
        }
        return user;
    }

    signout() {
        // Logic for signing out a user
    }x
}
