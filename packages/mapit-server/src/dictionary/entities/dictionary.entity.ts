import { Entity, Column, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { DictionaryItem } from '../../dictionary_item/entities/dictionary_item.entity';
import { Project } from '../../project/entities/project.entity';
import { BaseEntity } from '../../base/base.entity';
import { TableNaming } from '../../constant/table';

@Entity(TableNaming.DICTIONARY) // 明确指定表名
export class Dictionary extends BaseEntity {
  @Column()
  @Index()
  name: string;

  @Column()
  @Index()
  code: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => DictionaryItem, (item) => item.dictionary)
  items: DictionaryItem[];

  @Column({ name: 'projectId' })
  @Index()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.dictionaries)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
