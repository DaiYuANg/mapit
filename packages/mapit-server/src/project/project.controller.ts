import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('项目管理')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '创建项目' })
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(createProjectDto);
  }

  @ApiOperation({ summary: '获取所有项目' })
  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @ApiOperation({ summary: '根据ID获取项目' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return await this.projectService.findOne(id);
  }

  @ApiOperation({ summary: '更新项目' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.update(id, updateProjectDto);
  }

  @ApiOperation({ summary: '删除项目' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Project> {
    return await this.projectService.remove(id);
  }
}
