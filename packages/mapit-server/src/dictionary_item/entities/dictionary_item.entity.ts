// packages/mapit-server/src/dictionary/entities/dictionary-item.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';
import { BaseEntity } from '../../base/base.entity';
import { TableNaming } from '../../constant/table';
import { extra } from '../extra';

@Entity(TableNaming.DICTIONARY_ITEM) // 明确指定表名
export class DictionaryItem extends BaseEntity {
  @Column()
  @Index()
  name: string;

  @Column()
  @Index()
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  sort: number;

  @Column({ name: 'dictionaryId', type: 'varchar' })
  @Index()
  dictionaryId: string;

  @ManyToOne(() => Dictionary, (dictionary) => dictionary.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dictionaryId' })
  dictionary: Dictionary;

  @Column({ type: 'json', nullable: true })
  extra?: extra;
}
