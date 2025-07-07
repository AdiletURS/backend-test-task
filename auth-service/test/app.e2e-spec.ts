import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnection } from 'typeorm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Явно устанавливаем соединение
    const connection = getConnection();
    if (!connection.isConnected) {
      await connection.connect();
    }
  });

  afterAll(async () => {
    const connection = getConnection();
    if (connection.isConnected) {
      await connection.close();
    }
    await app.close();
  });

  // Тесты...
  it('/auth/login (POST) - successful login', async () => {
    // Seed user
    await request(app.getHttpServer())
        .post('/auth/seed')
        .send({ email: 'test@example.com', password: 'password123' });

    const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password123' })
        .expect(200);

    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('refresh_token');
  });
});