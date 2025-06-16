import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Dictionary } from './dictionary/entities/dictionary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project/entities/project.entity';
import { DictionaryItem } from './dictionary_item/entities/dictionary_item.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name, { timestamp: true });

  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
    @InjectRepository(DictionaryItem)
    private readonly dictionaryItemRepository: Repository<DictionaryItem>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async queryLabel(projectId: string, dictionaryCode: string, itemValue: string) {
    const cacheKey = `dictItem:${projectId}:${dictionaryCode}:${itemValue}`;

    // 先查缓存
    const cached = await this.cacheManager.get<{
      name: string;
      description?: string;
      extra?: any;
      code: string;
    }>(cacheKey);

    if (cached) {
      this.logger.log(`Cache hit for ${cacheKey}`);
      return cached;
    }

    // 缓存未命中，查数据库
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException('project not found');
    }

    const dictItem = await this.dictionaryItemRepository.findOne({
      where: {
        code: itemValue,
        dictionary: { code: dictionaryCode, project: { id: projectId } },
      },
    });

    if (!dictItem) {
      throw new NotFoundException('dictionary item not found');
    }

    const result = {
      name: dictItem.name,
      description: dictItem.description,
      extra: dictItem.extra,
      code: dictItem.code,
    };

    // 写入缓存，设置过期时间（秒）
    await this.cacheManager.set(cacheKey, result, 60 * 60); // 1小时缓存

    return result;
  }

  async getAllByProject(projectId: string) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('project not found');
    }

    const dictionaries = await this.dictionaryRepository.find({
      where: { project: { id: projectId } },
      relations: ['items'],
      order: {
        code: 'ASC',
        items: {
          sort: 'ASC',
        },
      },
    });

    return Object.fromEntries(
      dictionaries.map((dict) => [
        dict.code,
        dict.items.map((item) => ({
          code: item.code,
          name: item.name,
          description: item.description,
        })),
      ]),
    );
  }
}
