import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';

@Entity({ name: 'user', schema: 'public' })
export class User extends BaseEntity{

  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;
}
