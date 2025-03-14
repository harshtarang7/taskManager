import { DateTimeHelper } from 'src/common/utils/date.time.helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Task } from '../task/task.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', name: 'username', nullable: false })
  username: string;

  @Column({ type: 'varchar', name: 'email', nullable: false })
  email: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'timestamp', nullable: false })
  created_at: string = DateTimeHelper.getCurrentDateTime();

  @Column({ type: 'timestamp', nullable: false })
  updated_at: string = DateTimeHelper.getCurrentDateTime();

  // @OneToMany(() => Task, (task) => task.user)
  // tasks: Task;
}
