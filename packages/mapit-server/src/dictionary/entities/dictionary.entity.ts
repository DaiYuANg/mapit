import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { DictionaryItem } from '../../dictionary_item/entities/dictionary_item.entity';

@Entity()
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
