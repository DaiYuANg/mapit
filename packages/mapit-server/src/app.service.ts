import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Dictionary } from './dictionary/entities/dictionary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project/entities/project.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name, { timestamp: true });

  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async queryLabel(projectId: string, dictionaryCode: string, itemValue: string) {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new NotFoundException('project not found');
    }
    this.logger.log(project);

    this.logger.log(dictionaryCode);
    const dict = await this.dictionaryRepository.findOne({
      where: {
        code: dictionaryCode,
        project: { id: project.id },
      },
      relations: ['items'],
    });

    if (!dict) {
      throw new NotFoundException('dictionary not found');
    }

    return dict.items.find((item) => item.code === itemValue)?.name;
  }
}
