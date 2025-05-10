import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepo: Repository<Dictionary>,
  ) {}

  async create(createDictionaryDto: CreateDictionaryDto) {
    const dictionary = this.dictionaryRepo.create(createDictionaryDto);
    return this.dictionaryRepo.save(dictionary);
  }

  async findAll() {
    return this.dictionaryRepo.find({ relations: ['items'] });
  }

  async findOne(id: number) {
    return this.dictionaryRepo.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
    await this.dictionaryRepo.update(id, updateDictionaryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const toDelete = await this.findOne(id);
    if (!toDelete) {
      throw new NotFoundException(`Dictionary with id ${id} not found`);
    }
    await this.dictionaryRepo.delete(id);
    return { success: true };
  }

  async findByCode(code: string) {
    return this.dictionaryRepo.findOne({
      where: { code },
      relations: ['items'], // 加载字典项
    });
  }
}
