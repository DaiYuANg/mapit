import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';
import { AccessKey } from '../../access_key/entities/access_key.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Dictionary, (dictionary) => dictionary.project)
  dictionaries: Dictionary[];

  @OneToMany(() => AccessKey, (accessKey) => accessKey.project)
  accessKeys: AccessKey[];
}
