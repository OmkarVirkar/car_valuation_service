import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(email: string, password: string): Promise<User> {
        const user = this.usersRepository.create({ email, password });
        return this.usersRepository.save(user);
    }

    async findOne(id: number): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { id } });
    }

    async find(email: string): Promise<User[]> {
        return await this.usersRepository.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, attrs);
        return this.usersRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        await this.usersRepository.remove(user);
    }

}
