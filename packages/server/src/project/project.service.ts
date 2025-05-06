import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Dictionary} from "../dictionary/entities/dictionary.entity";
import {Repository} from "typeorm";
import {Project} from "./entities/project.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
  }

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  async findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({where: {id}});
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
    return {deleted: true};
  }
}
