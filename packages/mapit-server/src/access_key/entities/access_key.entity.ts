// AccessKey.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('access_key')
export class AccessKey {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'bigint', nullable: true })
  projectId: string;

  @Column({ unique: true })
  key: string;

  @Column({ nullable: true })
  secret: string;

  @Column({ nullable: true })
  project_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ nullable: true })
  remark: string;
}
