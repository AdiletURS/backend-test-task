
import {CreateTodoDto} from "../../todos/dto/create-todo.dto";
import {UpdateTodoDto} from "../../todos/dto/update-todo.dto";
import {Todo} from "../../todos/entities/todo.entity";
import {TodoResponseDto} from "../../todos/dto/todo-response.dto";

export interface ITodoMapper {
    fromCreateDtoToEntity(dto: CreateTodoDto, userId: string): Todo;
    fromUpdateDtoToEntity(dto: UpdateTodoDto, entity: Todo): Todo;
    fromEntityToResponseDto(entity: Todo): TodoResponseDto;
    fromEntitiesToResponseDtos(entities: Todo[]): TodoResponseDto[];
}