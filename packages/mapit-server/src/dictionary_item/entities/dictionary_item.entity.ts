import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';

@Entity()
export class DictionaryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Dictionary, (dictionary) => dictionary.items, { onDelete: 'CASCADE' })
  dictionary: Dictionary;
}
