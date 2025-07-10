import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {TodoMapper} from "./mappers/todo.mapper";
import { TodoResponseDto } from './dto/todo-response.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>,
        private readonly todoMapper: TodoMapper
    ) {}

    async create(createTodoDto: CreateTodoDto, userId: string): Promise<TodoResponseDto> {
        const todoEntity = this.todoMapper.fromCreateDtoToEntity(createTodoDto, userId);
        const savedEntity = await this.todosRepository.save(todoEntity);
        return this.todoMapper.fromEntityToResponseDto(savedEntity);
    }

    async findAll(userId: string): Promise<TodoResponseDto[]> {
        const entities = await this.todosRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' }
        });
        return this.todoMapper.fromEntitiesToResponseDtos(entities);
    }

    async findOne(id: string, userId: string): Promise<TodoResponseDto> {
        const entity = await this.todosRepository.findOne({ where: { id, userId } });
        return this.todoMapper.fromEntityToResponseDto(entity!);
    }

    async update(id: string, updateTodoDto: UpdateTodoDto, userId: string): Promise<TodoResponseDto> {
        const existingEntity = await this.todosRepository.findOne({ where: { id, userId } });

        if (!existingEntity) {
            throw new Error('Todo not found');
        }

        const updatedEntity = this.todoMapper.fromUpdateDtoToEntity(updateTodoDto, existingEntity);
        const savedEntity = await this.todosRepository.save(updatedEntity);
        return this.todoMapper.fromEntityToResponseDto(savedEntity);
    }

    async remove(id: string, userId: string): Promise<void> {
        await this.todosRepository.delete({ id, userId });
    }
}