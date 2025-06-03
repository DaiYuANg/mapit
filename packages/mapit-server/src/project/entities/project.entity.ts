// Project.ts
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { AccessKey } from '../../access_key/entities/access_key.entity';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';

@Entity('project')
export class Project {
  @PrimaryColumn('bigint')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AccessKey, (accessKey) => accessKey.project)
  accessKeys: AccessKey[];

  @OneToMany(() => Dictionary, (dictionary) => dictionary.project)
  dictionaries: Dictionary[];

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
