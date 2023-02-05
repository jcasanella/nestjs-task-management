import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let t: Task[] = this.tasks;

    if (status) {
      t = t.filter((a) => a.status === status);
    }

    if (search) {
      t = t.filter((a) => {
        if (a.title.includes(search) || a.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }

    return t;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const idx: number = this.tasks.findIndex((t) => t.id === id);
    this.tasks[idx].status = status;
    return this.tasks[idx];
  }
}
