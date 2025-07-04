import { Controller, Post, Body } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    @Post('seed')
    async seedUser(@Body() body: { email: string; password: string }) {
        const user = this.usersRepository.create({
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        });
        return this.usersRepository.save(user);
    }
}