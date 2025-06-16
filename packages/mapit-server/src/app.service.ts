import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Dictionary } from './dictionary/entities/dictionary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project/entities/project.entity';
import { DictionaryItem } from './dictionary_item/entities/dictionary_item.entity';

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
  ) {}

  async queryLabel(projectId: string, dictionaryCode: string, itemValue: string) {
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
      return null; // 或 throw new NotFoundException('dictionary item not found');
    }

    return dictItem;
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
