// AccessKey.ts
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class AccessKey {
  @PrimaryColumn('bigint')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Project, (project) => project.accessKeys, { onDelete: 'CASCADE' })
  project: Project;
}
