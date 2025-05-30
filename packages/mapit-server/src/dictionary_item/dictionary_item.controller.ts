import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { DictionaryItemService } from './dictionary_item.service';
import { CreateDictionaryItemDto } from './dto/create-dictionary_item.dto';
import { UpdateDictionaryItemDto } from './dto/update-dictionary_item.dto';
import { PaginationDto } from './dto/pagination.dto';
import {ApiTags, ApiOperation, ApiQuery, ApiBearerAuth} from '@nestjs/swagger';

@ApiTags('字典项管理')
@Controller('dictionary-item')
export class DictionaryItemController {
  constructor(private readonly service: DictionaryItemService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建字典项' })
  @Post()
  create(@Body() dto: CreateDictionaryItemDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取所有字典项' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '根据字典ID获取所有字典项' })
  @Get('/by-dictionary/:dictionaryId')
  findByDictionaryId(@Param('dictionaryId') dictionaryId: string) {
    return this.service.findByDictionaryId(dictionaryId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '更新字典项' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDictionaryItemDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除字典项' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '分页查询所有字典项' })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认1' })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量，默认10' })
  @Get('paginated')
  findPaginated(@Query() paginationDto: PaginationDto & { dictionaryId?: string }) {
    return this.service.findPaginated(paginationDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: '根据ID获取字典项详情' })
  findOne(@Param('id') id: string) {
    if (!/^\d+$/.test(id)) {
      throw new NotFoundException('无效的ID');
    }
    return this.service.findOne(id);
  }
}
