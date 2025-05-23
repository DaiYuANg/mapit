// packages/mapit-server/src/dictionary/dictionary.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { Dictionary } from './entities/dictionary.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('字典管理')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  /**
   * 创建字典
   * @param createDictionaryDto 字典信息
   */
  @ApiOperation({ summary: '创建字典' })
  @ApiResponse({ status: 201, description: '成功创建字典' })
  @Post()
  async create(@Body() createDictionaryDto: CreateDictionaryDto): Promise<Dictionary> {
    return await this.dictionaryService.create(createDictionaryDto);
  }

  /**
   * 获取所有字典
   */
  @ApiOperation({ summary: '获取所有字典' })
  @Get()
  async findAll(): Promise<Dictionary[]> {
    return await this.dictionaryService.findAll();
  }

  /**
   * 根据ID获取字典
   * @param id 字典ID
   */
  @ApiOperation({ summary: '根据ID获取字典' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Dictionary> {
    const dictionary = await this.dictionaryService.findOne(id);
    if (!dictionary) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    return dictionary;
  }

  /**
   * 更新字典
   * @param id 字典ID
   * @param updateDictionaryDto 更新内容
   */
  @ApiOperation({ summary: '更新字典' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDictionaryDto: UpdateDictionaryDto): Promise<Dictionary> {
    const dictionary = await this.dictionaryService.update(id, updateDictionaryDto);
    if (!dictionary) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    return dictionary;
  }

  /**
   * 删除字典
   * @param id 字典ID
   */
  @ApiOperation({ summary: '删除字典' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Dictionary> {
    const dictionary = await this.dictionaryService.remove(id);
    if (!dictionary) {
      throw new NotFoundException(`Dictionary with ID ${id} not found`);
    }
    return dictionary;
  }
}
