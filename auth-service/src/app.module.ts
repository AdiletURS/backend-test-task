import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { SeedService } from './seed/seed.service';
import { AuthModule } from './auth/auth.module'; // если есть

@Module({
  imports: [
    // Подключение к БД
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [User],
      synchronize: true,
    }),
    // Регистрация репозитория User
    TypeOrmModule.forFeature([User]),
    // Другие модули, например AuthModule
    AuthModule,
  ],
  providers: [
    // SeedService теперь найдёт UserRepository
    SeedService,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}
  async onApplicationBootstrap() {
    await this.seedService.seed();
  }
}
