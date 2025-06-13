import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { TableNaming } from '../../constant/table';

@Entity({ name: TableNaming.USER, schema: 'public' })
export class User extends BaseEntity {
  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;
}
