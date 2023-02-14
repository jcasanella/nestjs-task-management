import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.findTaskById(id);
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let t: Task[] = this.tasks;
  //   if (status) {
  //     t = t.filter((a) => a.status === status);
  //   }
  //   if (search) {
  //     t = t.filter((a) => {
  //       if (a.title.includes(search) || a.description.includes(search)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }
  //   return t;
  // }
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((t) => t.id !== id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const idx: number = this.tasks.findIndex((t) => t.id === id);
  //   if (idx === -1) {
  //     throw new NotFoundException(`Task with ID "${id}" not`);
  //   }
  //   this.tasks[idx].status = status;
  //   return this.tasks[idx];
  // }
}
