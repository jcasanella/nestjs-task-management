import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findTaskById(id: string): Promise<Task> {
    const found = await this.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(taskDto: CreateTaskDto): Promise<Task> {
    const task = this.create({
      title: taskDto.title,
      description: taskDto.description,
      status: TaskStatus.OPEN,
    });

    return await this.save(task);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.delete(id);
    console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findTaskById(id);
    task.status = status;

    return await this.save(task);
  }
}
