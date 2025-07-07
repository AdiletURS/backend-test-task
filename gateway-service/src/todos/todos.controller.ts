import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoResponseDto } from './dto/todo-response.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator'; // Импорт кастомного декоратора

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new todo' })
    @ApiResponse({ status: 201, description: 'Todo created', type: TodoResponseDto })
    create(
        @Body() createTodoDto: CreateTodoDto,
        @User() user: { userId: string } // Используем кастомный декоратор
    ): Promise<TodoResponseDto> {
        return this.todosService.create(createTodoDto, user.userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all todos for current user' })
    @ApiResponse({ status: 200, description: 'List of todos', type: [TodoResponseDto] })
    findAll(
        @User() user: { userId: string } // Используем кастомный декоратор
    ): Promise<TodoResponseDto[]> {
        return this.todosService.findAll(user.userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a todo by ID' })
    @ApiResponse({ status: 200, description: 'Todo details', type: TodoResponseDto })
    findOne(
        @Param('id') id: string,
        @User() user: { userId: string } // Используем кастомный декоратор
    ): Promise<TodoResponseDto> {
        return this.todosService.findOne(id, user.userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a todo' })
    @ApiResponse({ status: 200, description: 'Updated todo', type: TodoResponseDto })
    update(
        @Param('id') id: string,
        @Body() updateTodoDto: UpdateTodoDto,
        @User() user: { userId: string } // Используем кастомный декоратор
    ): Promise<TodoResponseDto> {
        return this.todosService.update(id, updateTodoDto, user.userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a todo' })
    @ApiResponse({ status: 204, description: 'Todo deleted' })
    async remove(
        @Param('id') id: string,
        @User() user: { userId: string } // Используем кастомный декоратор
    ): Promise<void> {
        await this.todosService.remove(id, user.userId);
    }
}