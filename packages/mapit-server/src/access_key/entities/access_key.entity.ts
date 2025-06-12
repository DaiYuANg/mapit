// AccessKey.ts
import { Project } from 'src/project/entities/project.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Permission } from '../permission';
import { BaseEntity } from '../../base/base.entity';

@Entity('access_key')
export class AccessKey extends BaseEntity {
  @Column({ default: true })
  active: boolean;

  @Column({ type: 'uuid', nullable: true })
  projectId: string;

  @Column({ unique: true })
  key: string;

  @Column({ nullable: true })
  secret: string;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;

  @Column({ type: 'simple-array' })
  permissions: Permission[];

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
