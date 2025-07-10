import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from './entities/todo.entity';
import { AuthModule } from '../auth/auth.module';
import {TodoMapper} from "./mappers/todo.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Todo]), AuthModule],
    controllers: [TodosController],
    providers: [TodosService, TodoMapper],
})
export class TodosModule {}