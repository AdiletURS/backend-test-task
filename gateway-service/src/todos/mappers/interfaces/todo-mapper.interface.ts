
import {CreateTodoDto} from "../../dto/create-todo.dto";
import {UpdateTodoDto} from "../../dto/update-todo.dto";
import {Todo} from "../../entities/todo.entity";
import {TodoResponseDto} from "../../dto/todo-response.dto";

export interface ITodoMapper {
    fromCreateDtoToEntity(dto: CreateTodoDto, userId: string): Todo;
    fromUpdateDtoToEntity(dto: UpdateTodoDto, entity: Todo): Todo;
    fromEntityToResponseDto(entity: Todo): TodoResponseDto;
    fromEntitiesToResponseDtos(entities: Todo[]): TodoResponseDto[];
}