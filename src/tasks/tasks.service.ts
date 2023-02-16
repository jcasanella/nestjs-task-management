import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.findTaskById(id);
  }

  deleteTaskById(id: string): Promise<void> {
    return this.taskRepository.deleteTaskById(id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.taskRepository.updateTask(id, status);
  }
}
