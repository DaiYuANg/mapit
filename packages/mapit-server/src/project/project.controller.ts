import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../dictionary_item/dto/pagination.dto';

@ApiTags('项目管理')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '分页查询所有项目' })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认1' })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量，默认10' })
  @Get('paginated')
  async findPaginated(@Query() paginationDto: PaginationDto) {
    const { data, total } = await this.projectService.findPaginated(paginationDto);
    return { data, total };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取所有项目' })
  @Get()
  async findAll(): Promise<{ data: Project[]; total: number }> {
    const data = await this.projectService.findAll();
    return { data, total: data.length };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取单个项目' })
  @Get('detail/:id')
  async findOne(@Param('id') id: string): Promise<{ data: Project }> {
    const data = await this.projectService.findOne(id);
    return { data };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建项目' })
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<{ data: Project }> {
    const data = await this.projectService.create(createProjectDto);
    return { data };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '更新项目' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<{ data: Project }> {
    const data = await this.projectService.update(id, updateProjectDto);
    return { data };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除项目' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ data: Project }> {
    const data = await this.projectService.remove(id);
    return { data };
  }

  @Post(':projectId/export-dictionaries')
  async exportDictionaries(@Param('projectId') projectId: string) {
    try {
      return await this.projectService.exportProjectDictionaries(projectId);
    } catch (error: any) {
      if (error) {
        throw new NotFoundException(error);
      }
      throw error;
    }
  }
}
