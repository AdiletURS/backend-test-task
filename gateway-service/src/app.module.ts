import { Module, NestModule, MiddlewareConsumer, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { RequestLogger } from './logger/request.logger';
import { SeedService } from './seed/seed.service';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    // Загрузка переменных окружения из .env (глобально)
    ConfigModule.forRoot({ isGlobal: true }),

    // Подключение к базе PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Только для разработки
    }),

    // Регистрация репозитория ToDo для SeedService и контроллеров
    TypeOrmModule.forFeature([Todo]),

    // Модули приложения: авторизация и CRUD
    AuthModule,
    TodosModule,
  ],
  providers: [SeedService ],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(RequestLogger)
        .forRoutes('*');
  }

  async onApplicationBootstrap() {
    await this.seedService.seed();
  }
}
