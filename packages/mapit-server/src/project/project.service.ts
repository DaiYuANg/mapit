import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dictionary_item/dto/pagination.dto';
import { generateId } from '../common/utils/id-generator';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDto,
      id: generateId(),
    });
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: string): Promise<Project> {
    const cacheKey = `project:${id}`;
    const cache = await this.cacheManager.get<Project>(cacheKey);
    if (cache) {
      return cache;
    }
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    await this.cacheManager.set(cacheKey, project, 3600);
    return project;
  }

  async update(id: string, updateProjectDto: Partial<CreateProjectDto>): Promise<Project> {
    await this.projectRepository.update(id, updateProjectDto);
    await this.cacheManager.del(`project:${id}`);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Project> {
    const project = await this.findOne(id);
    await this.cacheManager.del(`project:${id}`);
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
}
