// packages/mapit-server/src/dictionary/dictionary.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private dictionaryRepository: Repository<Dictionary>,
  ) {}

  async create(createDictionaryDto: CreateDictionaryDto) {
    const dictionary = this.dictionaryRepository.create({
      ...createDictionaryDto,
      project: { id: createDictionaryDto.projectId },
    });
    return await this.dictionaryRepository.save(dictionary);
  }

  async findAll() {
    return await this.dictionaryRepository.find({
      relations: ['items', 'project'],
    });
  }

  async findOne(id: string) {
    return await this.dictionaryRepository.findOne({
      where: { id },
      relations: ['items', 'project'],
    });
  }

  async update(id: string, updateDictionaryDto: UpdateDictionaryDto) {
    const { projectId, ...updateData } = updateDictionaryDto;
    await this.dictionaryRepository.update(id, {
      ...updateData,
      project: projectId ? { id: projectId } : undefined,
    });
    return await this.findOne(id);
  }

  async remove(id: string) {
    const dictionary = await this.findOne(id);
    if (!dictionary) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    return await this.dictionaryRepository.remove(dictionary);
  }
}
