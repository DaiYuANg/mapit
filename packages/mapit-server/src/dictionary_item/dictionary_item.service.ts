import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { DictionaryItem } from './entities/dictionary_item.entity';
import { CreateDictionaryItemDto } from './dto/create-dictionary_item.dto';
import { UpdateDictionaryItemDto } from './dto/update-dictionary_item.dto';
import { Dictionary } from '../dictionary/entities/dictionary.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class DictionaryItemService {
  constructor(
    @InjectRepository(DictionaryItem)
    private dictionaryItemRepository: Repository<DictionaryItem>,
    @InjectRepository(Dictionary)
    private dictionaryRepository: Repository<Dictionary>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  /** 创建字典项 */
  async create(createDictionaryItemDto: CreateDictionaryItemDto) {
    const dictionaryItem = this.dictionaryItemRepository.create({
      ...createDictionaryItemDto,
      dictionary: { id: createDictionaryItemDto.dictionaryId },
    });
    const result = await this.dictionaryItemRepository.save(dictionaryItem);
    await this.cacheManager.del(`dictionary_item:by_dict:${createDictionaryItemDto.dictionaryId}`);
    return result;
  }

  /** 获取所有字典项 */
  findAll() {
    return this.dictionaryItemRepository.find({ relations: ['dictionary'] });
  }

  /** 根据ID获取字典项 */
  findOne(id: string) {
    return this.dictionaryItemRepository.findOne({ where: { id }, relations: ['dictionary'] });
  }

  /** 更新字典项 */
  async update(id: string, updateDto: UpdateDictionaryItemDto) {
    const { dictionaryId, ...rest } = updateDto;
    await this.dictionaryItemRepository.update(id, {
      ...rest,
      dictionary: dictionaryId ? { id: dictionaryId } : undefined,
    });
    const updated = await this.findOne(id);
    if (!updated) throw new NotFoundException(`DictionaryItem with ID ${id} not found`);
    if (dictionaryId) {
      await this.cacheManager.del(`dictionary_item:by_dict:${dictionaryId}`);
    }
    return updated;
  }

  /** 删除字典项 */
  async remove(id: string) {
    const item = await this.findOne(id);
    if (!item) throw new NotFoundException(`DictionaryItem with ID ${id} not found`);
    await this.cacheManager.del(`dictionary_item:by_dict:${item.dictionary.id}`);
    return this.dictionaryItemRepository.remove(item);
  }

  /** 根据字典ID获取所有字典项 */
  async findByDictionaryId(dictionaryId: string) {
    const cacheKey = `dictionary_item:by_dict:${dictionaryId}`;
    const cache = await this.cacheManager.get<string>(cacheKey);
    if (cache) {
      return JSON.parse(cache) as DictionaryItem[];
    }
    const data = await this.dictionaryItemRepository.find({
      where: { dictionary: { id: dictionaryId } },
      order: { sort: 'ASC' },
      relations: ['dictionary'],
    });
    await this.cacheManager.set(cacheKey, JSON.stringify(data), 3600);
    return data;
  }

  /** 通过字典 code 查询所有字典项 */
  async findByCode(code: string) {
    const dict = await this.dictionaryRepository.findOne({ where: { code } });
    if (!dict) throw new NotFoundException(`未找到编码为${code}的字典`);
    return this.findByDictionaryId(dict.id);
  }

  /** 分页查询所有字典项 */
  async findPaginated(paginationDto: PaginationDto & { dictionaryId?: string }) {
    const { page = 1, pageSize = 10, dictionaryId } = paginationDto;
    const skip = (page - 1) * pageSize;
    const where: Record<string, any> = {};
    if (dictionaryId) where.dictionary = { id: dictionaryId };
    const [items, total] = await this.dictionaryItemRepository.findAndCount({
      where,
      skip,
      take: pageSize,
      order: { sort: 'ASC' },
      relations: ['dictionary'],
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
