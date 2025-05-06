import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Dictionary} from "../../dictionary/entities/dictionary.entity";

@Entity()
export class DictionaryItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    value: string;

    @ManyToOne(() => Dictionary, dictionary => dictionary.items)
    dictionary: Dictionary;
}