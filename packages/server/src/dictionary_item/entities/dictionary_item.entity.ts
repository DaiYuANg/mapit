import { Dictionary } from 'src/dictionary/entities/dictionary.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class DictionaryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Dictionary, (dictionary) => dictionary.items)
  dictionary: Dictionary;

  @Column({ type: 'varchar', length: 255 })
  key: string;

  @Column({ type: 'varchar', length: 255 })
  value: string;
}
