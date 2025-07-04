import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../todos/entities/todo.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>,
    ) {}

    async seed() {
        const todos = [
            { title: 'Learn NestJS', userId: 'seed-user' },
            { title: 'Implement JWT', userId: 'seed-user', completed: true },
            { title: 'Dockerize app', userId: 'seed-user' },
        ];

        await Promise.all(
            todos.map(todo => this.todosRepository.save(this.todosRepository.create(todo)))
        );
    }
}