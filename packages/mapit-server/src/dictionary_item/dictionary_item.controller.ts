import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { DictionaryItemService } from './dictionary_item.service';
import { CreateDictionaryItemDto } from './dto/create-dictionary_item.dto';
import { UpdateDictionaryItemDto } from './dto/update-dictionary_item.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('字典项管理')
@Controller('dictionary-item')
export class DictionaryItemController {
  constructor(private readonly service: DictionaryItemService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '创建字典项' })
  @Post()
  async create(@Body() dto: CreateDictionaryItemDto) {
    const data = await this.service.create(dto);
    return { data };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取所有字典项' })
  @Get()
  async findAll() {
    const data = await this.service.findAll();
    return { data, total: data.length };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '根据字典ID获取所有字典项' })
  @Get('/by-dictionary/:dictionaryId')
  async findByDictionaryId(@Param('dictionaryId') dictionaryId: string) {
    const data = await this.service.findByDictionaryId(dictionaryId);
    return { data, total: data.length };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '更新字典项' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDictionaryItemDto) {
    const data = await this.service.update(id, dto);
    return { data };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '删除字典项' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.service.remove(id);
    return { data };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '分页查询所有字典项' })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认1' })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页数量，默认10' })
  @Get('paginated')
  async findPaginated(@Query() paginationDto: PaginationDto & { dictionaryId?: string }) {
    const { data, total } = await this.service.findPaginated(paginationDto);
    return { data, total };
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: '根据ID获取字典项详情' })
  async findOne(@Param('id') id: string) {
    if (!/^[\w-]+$/.test(id)) {
      throw new NotFoundException('无效的ID');
    }
    const data = await this.service.findOne(id);
    return { data };
  }
}
