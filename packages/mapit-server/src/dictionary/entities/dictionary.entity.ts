import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DictionaryItem } from '../../dictionary_item/entities/dictionary_item.entity';
import { Project } from '../../project/entities/project.entity';
import { BaseEntity } from '../../base/base.entity';

@Entity('dictionary') // 明确指定表名
export class Dictionary extends BaseEntity{
  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => DictionaryItem, (item) => item.dictionary)
  items: DictionaryItem[];

  @Column({ name: 'projectId' })
  projectId: string;

  @ManyToOne(() => Project, (project) => project.dictionaries)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
