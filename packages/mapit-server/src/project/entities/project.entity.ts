// Project.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AccessKey } from '../../access_key/entities/access_key.entity';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AccessKey, accessKey => accessKey.project)
  accessKeys: AccessKey[];

  @OneToMany(() => Dictionary, dictionary => dictionary.project)
  dictionaries: Dictionary[];
}
