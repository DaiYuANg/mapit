import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class AccessKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  key: string;

  @Column({ type: 'varchar', length: 255 })
  secret: string;

  @ManyToOne(() => Project, (project) => project.accessKeys)
  project: Project;

  @Column({ type: 'varchar', length: 255, nullable: true })
  permissions: string; // 例如：'read', 'write', 'admin'

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  expiresAt: Date;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;
}
