// Project.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { AccessKey } from '../../access_key/entities/access_key.entity';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';
import { BaseEntity } from '../../base/base.entity';
import { ProjectType } from '../project.type';
import { TableNaming } from '../../constant/table';

@Entity(TableNaming.PROJECT)
export class Project extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'int',
    default: ProjectType.private as number,
  })
  projectType: ProjectType;

  @OneToMany(() => AccessKey, (accessKey) => accessKey.project)
  accessKeys: AccessKey[];

  @OneToMany(() => Dictionary, (dictionary) => dictionary.project)
  dictionaries: Dictionary[];
}
