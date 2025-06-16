// AccessKey.ts
import { Project } from 'src/project/entities/project.entity';
import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Permission } from '../permission';
import { BaseEntity } from '../../base/base.entity';
import { TableNaming } from '../../constant/table';

@Entity(TableNaming.ACCESS_KEY)
export class AccessKey extends BaseEntity {
  @Column({ default: true })
  active: boolean;

  @Column({ type: 'uuid', nullable: false })
  @Index()
  projectId: string;

  @Column({ unique: true })
  @Index()
  key: string;

  @Column({ nullable: true })
  @Index()
  secret: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ type: 'simple-array' })
  permissions: Permission[];

  @Column({ type: 'int', default: 0 })
  usageCount: number;

  @Column({ type: 'timestamp', nullable: true })
  lastUsedAt: Date;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ nullable: true })
  remark: string;
}
