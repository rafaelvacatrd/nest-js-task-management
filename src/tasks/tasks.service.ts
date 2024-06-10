import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: Task['id']): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    console.log(result);
  }

  async updateTaskStatus(
    id: Task['id'],
    status: Task['status'],
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  /* getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }
    return tasks;
  }

  getTaskById(_id: Task['id']): Task {
    const found = this.tasks.find(({ id }) => _id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${_id}" not found`);
    }

    return found;
  }



  createTask(createTaskDto: CreateTaskDto): Task {
    const { description, title } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(_id: Task['id']) {
    const found = this.getTaskById(_id);
    this.tasks = this.tasks.filter(({ id }) => id !== found.id);
  }

  updateTaskStatus(_id: Task['id'], _status: Task['status']) {
    const task = this.getTaskById(_id);
    task.status = _status;
    return task;
  } */
}
