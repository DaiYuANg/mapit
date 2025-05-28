// packages/mapit-server/src/dictionary/entities/dictionary.entity.ts
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { DictionaryItem } from '../../dictionary_item/entities/dictionary_item.entity';

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

  @Column({ nullable: true })
  namespace: string;

  @OneToMany(() => DictionaryItem, (item) => item.dictionary)
  items: DictionaryItem[];
}
