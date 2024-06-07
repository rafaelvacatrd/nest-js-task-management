import { IsEnum } from 'class-validator';
import { Task, TaskStatus } from '../tasks.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: Task['status'];
}
