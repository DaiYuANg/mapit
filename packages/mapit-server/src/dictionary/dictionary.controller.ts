// packages/mapit-server/src/dictionary/dictionary.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { Dictionary } from './entities/dictionary.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from '../dictionary_item/dto/pagination.dto';
@ApiTags('字典管理')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  /**
   * 创建字典
   * @param createDictionaryDto 字典信息
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建字典' })
  @ApiResponse({ status: 201, description: '成功创建字典' })
  @Post()
  async create(@Body() createDictionaryDto: CreateDictionaryDto): Promise<{ data: Dictionary }> {
    const data = await this.dictionaryService.create(createDictionaryDto);
    return { data };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '分页查询所有字典' })
  @ApiQuery({ name: 'projectId', required: false, description: '项目ID' })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认1' })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量，默认10' })
  @Get('paginated')
  async findPaginated(@Query() paginationDto: PaginationDto & { projectId?: string }) {
    const { data, total } = await this.dictionaryService.findPaginated(paginationDto);
    return { data, total };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取所有字典' })
  @ApiQuery({ name: 'projectId', required: false, description: '项目ID' })
  @Get()
  async findAll(@Query('projectId') projectId?: string): Promise<{ data: Dictionary[]; total: number }> {
    const data = await this.dictionaryService.findAll(projectId);
    return { data, total: data.length };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '根据ID获取字典' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ data: Dictionary }> {
    const data = await this.dictionaryService.findOne(id);
    if (!data) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    return { data };
  }

  /**
   * 更新字典
   * @param id 字典ID
   * @param updateDictionaryDto 更新内容
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新字典' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDictionaryDto: UpdateDictionaryDto,
  ): Promise<{ data: Dictionary }> {
    const data = await this.dictionaryService.update(id, updateDictionaryDto);
    if (!data) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    return { data };
  }

  /**
   * 删除字典
   * @param id 字典ID
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除字典' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ data: Dictionary }> {
    const data = await this.dictionaryService.remove(id);
    if (!data) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    return { data };
  }

  @ApiBearerAuth()
  @Get('project/:projectId')
  @ApiOperation({ summary: '获取项目下的所有字典' })
  @ApiResponse({ status: 200, description: '返回项目下的所有字典' })
  async findByProjectId(@Param('projectId') projectId: string): Promise<{ data: Dictionary[]; total: number }> {
    const data = await this.dictionaryService.findByProjectId(projectId);
    return { data, total: data.length };
  }
}
