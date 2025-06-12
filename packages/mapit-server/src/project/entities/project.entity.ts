// Project.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { AccessKey } from '../../access_key/entities/access_key.entity';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';
import { BaseEntity } from '../../base/base.entity';

@Entity('project')
export class Project extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => AccessKey, (accessKey) => accessKey.project)
  accessKeys: AccessKey[];

  @OneToMany(() => Dictionary, (dictionary) => dictionary.project)
  dictionaries: Dictionary[];
}
