import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn('bigint', { generated: false })
  id: number;

  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
