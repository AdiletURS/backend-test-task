import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RequestLogger implements NestMiddleware {
    private logPath: string;
    private logFile: string;

    constructor() {
        // Определяем путь для логов
        this.logPath = process.env.LOG_PATH || path.join(process.cwd(), 'logs');
        this.logFile = path.join(this.logPath, 'requests.log');

        // Создаем директорию, если ее нет
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath, { recursive: true });
        }
    }

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, ip } = req;
        const start = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const duration = Date.now() - start;
            const logEntry = `${new Date().toISOString()} | ${method} ${originalUrl} | ${statusCode} | ${duration}ms | IP: ${ip}\n`;

            // Используем асинхронную запись
            fs.appendFile(this.logFile, logEntry, (err) => {
                if (err) console.error('Failed to write log:', err);
            });

            console.log(logEntry.trim());
        });

        next();
    }
}