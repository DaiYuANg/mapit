import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictionaryItem } from './entities/dictionary_item.entity';
import { CreateDictionaryItemDto } from './dto/create-dictionary_item.dto';
import { UpdateDictionaryItemDto } from './dto/update-dictionary_item.dto';
import { Dictionary } from '../dictionary/entities/dictionary.entity';

@Injectable()
export class DictionaryItemService {
  constructor(
    @InjectRepository(DictionaryItem)
    private dictionaryItemRepository: Repository<DictionaryItem>,
    @InjectRepository(Dictionary)
    private dictionaryRepository: Repository<Dictionary>,
  ) {}

  /** 创建字典项 */
  create(createDto: CreateDictionaryItemDto) {
    const item = this.dictionaryItemRepository.create({
      ...createDto,
      dictionary: { id: createDto.dictionaryId },
    });
    return this.dictionaryItemRepository.save(item);
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
    await this.dictionaryItemRepository.update(id, {
      ...updateDto,
      dictionary: updateDto.dictionaryId ? { id: updateDto.dictionaryId } : undefined,
    });
    const updated = await this.findOne(id);
    if (!updated) throw new NotFoundException(`DictionaryItem with ID ${id} not found`);
    return updated;
  }

  /** 删除字典项 */
  async remove(id: string) {
    const item = await this.findOne(id);
    if (!item) throw new NotFoundException(`DictionaryItem with ID ${id} not found`);
    return this.dictionaryItemRepository.remove(item);
  }

  /** 根据字典ID获取所有字典项 */
  findByDictionaryId(dictionaryId: string) {
    return this.dictionaryItemRepository.find({
      where: { dictionary: { id: dictionaryId } },
      order: { sort: 'ASC' },
      relations: ['dictionary'],
    });
  }

  /** 通过字典 code 查询所有字典项 */
  async findByCode(code: string) {
    const dict = await this.dictionaryRepository.findOne({ where: { code } });
    if (!dict) throw new NotFoundException(`未找到编码为${code}的字典`);
    return this.findByDictionaryId(dict.id);
  }
}
