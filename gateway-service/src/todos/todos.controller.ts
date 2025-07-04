import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';  // Убедитесь, что этот файл существует
import { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

interface AuthenticatedRequest extends ExpressRequest {
    user: {
        userId: string;
        email: string;
        // другие поля, если нужно
    };
}

@ApiTags('ToDo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    create(
        @Body() createTodoDto: CreateTodoDto,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.todosService.create(createTodoDto, req.user.userId);
    }

    @Get()
    findAll(@Req() req: AuthenticatedRequest) {
        return this.todosService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.todosService.findOne(id, req.user.userId);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateTodoDto: UpdateTodoDto,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.todosService.update(id, updateTodoDto, req.user.userId);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.todosService.remove(id, req.user.userId);
    }
}
