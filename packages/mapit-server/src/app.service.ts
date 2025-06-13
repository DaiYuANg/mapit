import { Injectable } from '@nestjs/common';
import { AccessKeyService } from './access_key/access_key.service';
import { Repository } from 'typeorm';
import { Dictionary } from './dictionary/entities/dictionary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project/entities/project.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly accessKeyService: AccessKeyService,
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
      throw new Error('project not found');
    }
    console.log(project);

    console.log(dictionaryCode);
    const dict = await this.dictionaryRepository.findOne({
      where: {
        code: dictionaryCode,
        project: { id: project.id },
      },
      relations: ['items'],
    });

    if (!dict) {
      throw new Error('dictionary not found');
    }

    return dict.items.find((item) => item.code === itemValue)?.name;
  }
}
