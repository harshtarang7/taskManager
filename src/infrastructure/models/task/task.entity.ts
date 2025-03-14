import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { DateTimeHelper } from 'src/common/utils/date.time.helper';

export enum task_priority_type{
    'low',
    'medium',
    'high'
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 20, default: 'TODO' })
  status: string;

  @Column({ type: 'date', nullable: true })
  due_date?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: string;

  @Column({ type: 'enum', enum: task_priority_type, default: task_priority_type.low })
  priority: task_priority_type;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
