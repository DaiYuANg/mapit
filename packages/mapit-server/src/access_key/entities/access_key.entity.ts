// AccessKey.ts
import { Project } from 'src/project/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('access_key')
export class AccessKey {
  @PrimaryGeneratedColumn({ type: 'int' })
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

  project: Project;

  @CreateDateColumn({ type: 'date' })
  created_at: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date;

  @Column({ nullable: true })
  remark: string;
}
