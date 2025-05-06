import { Injectable } from '@nestjs/common';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Dictionary} from "./entities/dictionary.entity";
import {Repository} from "typeorm";

@Injectable()
export class DictionaryService {
  constructor(
      @InjectRepository(Dictionary)
      private readonly dictionaryRepo: Repository<Dictionary>,
  ) {}
  create(createDictionaryDto: CreateDictionaryDto) {
    return 'This action adds a new dictionary';
  }

  findAll() {
    return `This action returns all dictionary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dictionary`;
  }

  update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
    return `This action updates a #${id} dictionary`;
  }

  remove(id: number) {
    return `This action removes a #${id} dictionary`;
  }

  async findByCode(code: string) {
    return this.dictionaryRepo.findOne({
      where: { code },
      relations: ['items'], // 加载字典项
    });
  }
}
