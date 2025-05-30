// packages/mapit-server/src/dictionary/entities/dictionary.entity.ts
import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { DictionaryItem } from '../../dictionary_item/entities/dictionary_item.entity';
import { Project } from '../../project/entities/project.entity';

@Entity('dictionary') // 明确指定表名
export class Dictionary {
  @PrimaryColumn('bigint')
  id: string;

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

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
