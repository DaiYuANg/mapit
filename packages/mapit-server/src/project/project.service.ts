import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dictionary_item/dto/pagination.dto';
import { Dictionary } from '../dictionary/entities/dictionary.entity';
import { DictionaryItem } from '../dictionary_item/entities/dictionary_item.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Dictionary)
    private dictionaryRepository: Repository<Dictionary>,
    @InjectRepository(DictionaryItem)
    private dictionaryItemRepository: Repository<DictionaryItem>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDto,
    });
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: string | undefined): Promise<Project> {
    console.log('project id:{}', id);
    if (id) {
      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      // await this.cacheManager.set(cacheKey, project, 3600);
      return project;
    }
    throw new NotFoundException(`Project with ID ${id} not found`);
  }

  async update(id: string, updateProjectDto: Partial<CreateProjectDto>): Promise<Project> {
    await this.projectRepository.update(id, updateProjectDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Project> {
    const project = await this.findOne(id);
    return await this.projectRepository.remove(project);
  }

  /** 分页查询所有项目 */
  async findPaginated(paginationDto: PaginationDto) {
    const { page = 1, pageSize = 10 } = paginationDto;
    const skip = (page - 1) * pageSize;
    const [items, total] = await this.projectRepository.findAndCount({
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

  async exportProjectDictionaries(projectId: string) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['dictionaries', 'dictionaries.items'],
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found.`);
    }

    // 构造导出数据结构
    return {
      projectName: project.name,
      projectDescription: project.description,
      dictionaries: project.dictionaries.map((dict) => ({
        name: dict.name,
        code: dict.code,
        description: dict.description,
        items: dict.items.map((item) => ({
          name: item.name,
          code: item.code,
          description: item.description,
          sort: item.sort,
        })),
      })),
    };
  }
}
