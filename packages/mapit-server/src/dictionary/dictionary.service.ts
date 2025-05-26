// packages/mapit-server/src/dictionary/dictionary.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PaginationDto } from '../dictionary_item/dto/pagination.dto';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private dictionaryRepository: Repository<Dictionary>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const cacheKey = `dictionary:${id}`;
    const cache = await this.cacheManager.get<Dictionary>(cacheKey);
    if (cache) {
      return cache;
    }
    const dictionary = await this.dictionaryRepository.findOne({
      where: { id },
      relations: ['items', 'project'],
    });
    if (!dictionary) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    await this.cacheManager.set(cacheKey, dictionary, 3600);
    return dictionary;
  }

  async update(id: string, updateDictionaryDto: UpdateDictionaryDto) {
    const { projectId, ...updateData } = updateDictionaryDto;
    await this.dictionaryRepository.update(id, {
      ...updateData,
      project: projectId ? { id: projectId } : undefined,
    });
    await this.cacheManager.del(`dictionary:${id}`);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const dictionary = await this.findOne(id);
    if (!dictionary) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    await this.cacheManager.del(`dictionary:${id}`);
    return await this.dictionaryRepository.remove(dictionary);
  }

  /** 分页查询所有字典 */
  async findPaginated(paginationDto: PaginationDto) {
    const { page = 1, pageSize = 10 } = paginationDto;
    const skip = (page - 1) * pageSize;
    const [items, total] = await this.dictionaryRepository.findAndCount({
      skip,
      take: pageSize,
      order: { id: 'ASC' },
    });
    return {
      data: items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
