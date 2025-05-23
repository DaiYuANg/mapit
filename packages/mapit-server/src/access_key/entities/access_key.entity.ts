// AccessKey.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class AccessKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Project, (project) => project.accessKeys, { onDelete: 'CASCADE' })
  project: Project;
}
