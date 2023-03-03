import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filterDto;

    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async findTaskById(id: string, user: User): Promise<Task> {
    const found = await this.findOne({
      where: {
        id,
        user,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(taskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.create({
      title: taskDto.title,
      description: taskDto.description,
      status: TaskStatus.OPEN,
      user,
    });

    return await this.save(task);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.delete({ id, user });
    console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.findTaskById(id, user);
    task.status = status;

    return await this.save(task);
  }
}
