import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DictionaryItemService } from './dictionary_item.service';
import { CreateDictionaryItemDto } from './dto/create-dictionary_item.dto';
import { UpdateDictionaryItemDto } from './dto/update-dictionary_item.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('字典项管理')
@Controller('dictionary-item')
export class DictionaryItemController {
  constructor(private readonly service: DictionaryItemService) {}

  @ApiOperation({ summary: '创建字典项' })
  @Post()
  create(@Body() dto: CreateDictionaryItemDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: '获取所有字典项' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: '根据字典ID获取所有字典项' })
  @Get('/by-dictionary/:dictionaryId')
  findByDictionaryId(@Param('dictionaryId') dictionaryId: string) {
    return this.service.findByDictionaryId(dictionaryId);
  }

  @ApiOperation({ summary: '通过字典编码获取字典项列表' })
  @Get('/by-code/:code')
  findByCode(@Param('code') code: string) {
    return this.service.findByCode(code);
  }

  @ApiOperation({ summary: '更新字典项' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDictionaryItemDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: '删除字典项' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @ApiOperation({ summary: '分页查询所有字典项' })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认1' })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量，默认10' })
  @Get('paginated')
  findPaginated(@Query() paginationDto: PaginationDto) {
    return this.service.findPaginated(paginationDto);
  }
}
