import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }             from '@nestjs/typeorm';
import { Repository }                   from 'typeorm';
import { Todo }                         from './entities/todo.entity';
import { CreateTodoDto }                from './dto/create-todo.dto';
import { UpdateTodoDto }                from './dto/update-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly todosRepository: Repository<Todo>,
    ) {}

    async create(createTodoDto: CreateTodoDto, userId: string) {
        const todo = this.todosRepository.create({
            ...createTodoDto,
            userId,
        });
        return this.todosRepository.save(todo);
    }

    findAll(userId: string) {
        return this.todosRepository.find({ where: { userId } });
    }

    async findOne(id: string, userId: string) {
        const todo = await this.todosRepository.findOne({ where: { id, userId } });
        if (!todo) {
            throw new NotFoundException(`Todo with id="${id}" not found for this user`);
        }
        return todo;
    }

    async update(id: string, updateTodoDto: UpdateTodoDto, userId: string) {
        // 1) Подгружаем существующий ToDo, бросаем 404, если нет
        const todo = await this.todosRepository.findOne({ where: { id, userId } });
        if (!todo) {
            throw new NotFoundException(`Todo with id="${id}" not found for this user`);
        }

        // 2) Копируем новые поля в сущность
        Object.assign(todo, updateTodoDto);

        // 3) Сохраняем и возвращаем обновлённую сущность
        return this.todosRepository.save(todo);
    }

    async remove(id: string, userId: string) {
        const result = await this.todosRepository.delete({ id, userId });
        if (result.affected === 0) {
            throw new NotFoundException(`Todo with id="${id}" not found for this user`);
        }
        return { deleted: true };
    }
}
