import { ApiProperty } from '@nestjs/swagger';

export class TodoResponseDto {
    @ApiProperty({ example: 'd1d8f6c0-0b7e-4b1e-9b7a-9b7a9b7a9b7a', description: 'Unique identifier' })
    id: string;

    @ApiProperty({ example: 'Buy groceries', description: 'Task title' })
    title: string;

    @ApiProperty({ example: 'Milk, eggs, bread', description: 'Task description', required: false })
    description: string;

    @ApiProperty({ example: false, description: 'Completion status' })
    completed: boolean;

    @ApiProperty({ example: '2023-07-07T12:00:00.000Z', description: 'Creation date' })
    createdAt: Date;

    @ApiProperty({ example: 'PENDING', description: 'Task status', enum: ['PENDING', 'COMPLETED'] })
    status: string;
}