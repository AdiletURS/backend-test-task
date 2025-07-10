import { Injectable } from '@nestjs/common';
import {CreateTodoDto} from "../dto/create-todo.dto";
import {UpdateTodoDto} from "../dto/update-todo.dto";
import { Todo } from "../entities/todo.entity";
import {TodoResponseDto} from "../dto/todo-response.dto";
import { ITodoMapper } from "./interfaces/todo-mapper.interface";

@Injectable()
export class TodoMapper implements ITodoMapper {
    fromCreateDtoToEntity(dto: CreateTodoDto, userId: string): Todo {
        const todo = new Todo();
        todo.title = dto.title;
        todo.description = dto.description || '';
        todo.completed = dto.completed || false;
        todo.userId = userId;
        return todo;
    }

    fromUpdateDtoToEntity(dto: UpdateTodoDto, entity: Todo): Todo {
        return {
            ...entity,
            title: dto.title ?? entity.title,
            description: dto.description ?? entity.description,
            completed: dto.completed ?? entity.completed,
        };
    }

    fromEntityToResponseDto(entity: Todo): TodoResponseDto {
        return {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            completed: entity.completed,
            createdAt: entity.createdAt,
            status: this.getStatus(entity),
        };
    }

    fromEntitiesToResponseDtos(entities: Todo[]): TodoResponseDto[] {
        return entities.map(entity => this.fromEntityToResponseDto(entity));
    }

    private getStatus(entity: Todo): string {
        return entity.completed ? 'COMPLETED' : 'PENDING';
    }
}