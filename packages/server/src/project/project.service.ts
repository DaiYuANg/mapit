import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { AccessKeyService } from '../access_key/access_key.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly accessKeyService: AccessKeyService, // 注入 AccessKeyService
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create(createProjectDto);

    const savedProject = await this.projectRepository.save(project);

    const accessKey = await this.accessKeyService.createAccessKey(savedProject);

    console.log(accessKey);

    return savedProject;
  }

  async findAll() {
    return this.projectRepository.find({
      relations: ['accessKeys'],
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({ where: { id }, relations: ['accessKeys'] });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const result = await this.projectRepository.update(id, updateProjectDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return { deleted: true };
  }
}
