# Environment Variables

## PostgreSQL
- `DB_USER`: Database username (default: testuser)
- `DB_PASSWORD`: Database password (default: testpassword)
- `DB_NAME`: Database name (default: testdb)

## JWT Authentication
- `JWT_ACCESS_SECRET`: Secret for signing access tokens
- `JWT_REFRESH_SECRET`: Secret for signing refresh tokens

## Services Ports
- Auth Service: 3001
- Gateway Service: 3000

## Logging (Gateway Service)
- `LOG_PATH`: Optional path for log files (default: logs in the app directory)



#### Шаг 5: Финализация проекта
1. **Проверка полного цикла**:
    - Авторизация:
      ```bash
      # Получение токенов
      curl -X POST http://localhost:3001/auth/login \
        -H "Content-Type: application/json" \
        -d '{"email":"test@example.com","password":"password123"}'
      ```
    - Создание ToDo:
      ```bash
      # Создание элемента
      curl -X POST http://localhost:3000/todos \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer <ACCESS_TOKEN>" \
        -d '{"title":"Learn Docker"}'
      ```

2. **Проверка логов**:
   ```bash
   docker-compose logs gateway-service
   # Или через файл
   docker exec -it gateway_service tail -f /usr/src/app/logs/requests.log