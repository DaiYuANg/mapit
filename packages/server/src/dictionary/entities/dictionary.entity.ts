import { DictionaryItem } from "src/dictionary_item/entities/dictionary_item.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Dictionary {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    name: string;

    @OneToMany(() => DictionaryItem, item => item.dictionary)
    items: DictionaryItem[];
}