// packages/mapit-server/src/dictionary/entities/dictionary.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { DictionaryItem } from '../../dictionary_item/entities/dictionary_item.entity';

@Entity('dictionary') // 明确指定表名
export class Dictionary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.dictionaries, { onDelete: 'CASCADE' })
  project: Project;

  @OneToMany(() => DictionaryItem, (item) => item.dictionary)
  items: DictionaryItem[];
}
