// packages/mapit-server/src/dictionary/entities/dictionary-item.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';

@Entity('dictionary_item') // 明确指定表名
export class DictionaryItem {
  @PrimaryColumn('bigint')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  sort: number;

  @Column({ nullable: true })
  namespace: string;

  @ManyToOne(() => Dictionary, dictionary => dictionary.items, { onDelete: 'CASCADE' })
  @JoinColumn()
  dictionary: Dictionary;
}
