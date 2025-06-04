import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  // @PrimaryColumn('bigint', { generated: false })
  // id: number;

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
