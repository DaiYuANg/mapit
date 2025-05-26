import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from '../dictionary_item/dto/pagination.dto';

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

  // @ApiOperation({ summary: '根据ID获取项目' })
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Project> {
  //   return await this.projectService.findOne(id);
  // }

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

  @ApiOperation({ summary: '分页查询所有项目' })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认1' })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量，默认10' })
  @Get('paginated')
  findPaginated(@Query() paginationDto: PaginationDto) {
    return this.projectService.findPaginated(paginationDto);
  }
}
