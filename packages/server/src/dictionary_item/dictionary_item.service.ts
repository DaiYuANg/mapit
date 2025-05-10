import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDictionaryItemDto } from './dto/create-dictionary_item.dto';
import { UpdateDictionaryItemDto } from './dto/update-dictionary_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictionaryItem } from './entities/dictionary_item.entity';

@Injectable()
export class DictionaryItemService {
  constructor(
    @InjectRepository(DictionaryItem)
    private readonly dictionaryItemRepository: Repository<DictionaryItem>,
  ) {}

  async create(createDictionaryItemDto: CreateDictionaryItemDto) {
    const dictionary = this.dictionaryItemRepository.create(createDictionaryItemDto);
    return this.dictionaryItemRepository.save(dictionary);
  }

  async findAll() {
    return this.dictionaryItemRepository.find({ relations: ['items'] });
  }

  async findOne(id: number) {
    return this.dictionaryItemRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDictionaryItemDto: UpdateDictionaryItemDto) {
    await this.dictionaryItemRepository.update(id, updateDictionaryItemDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const toDelete = await this.findOne(id);
    if (!toDelete) {
      throw new NotFoundException(`Dictionary with id ${id} not found`);
    }
    await this.dictionaryItemRepository.delete(id);
    return { success: true };
  }
}
