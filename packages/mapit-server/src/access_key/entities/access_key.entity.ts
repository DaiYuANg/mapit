// AccessKey.ts
import { Project } from 'src/project/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;

  @Column({ type: 'simple-array', default: 'read' })
  permissions: string[];

  @Column({ type: 'int', default: 0 })
  usage_count: number;

  @Column({ type: 'timestamp', nullable: true })
  last_used_at: Date;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ nullable: true })
  remark: string;
}
