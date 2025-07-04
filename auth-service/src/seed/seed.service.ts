import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async seed() {
        const exists = await this.usersRepository.count();
        if (!exists) {
            const testUser = this.usersRepository.create({
                email: 'test@example.com',
                password: await bcrypt.hash('password123', 10),
            });
            await this.usersRepository.save(testUser);
        }
    }
}
