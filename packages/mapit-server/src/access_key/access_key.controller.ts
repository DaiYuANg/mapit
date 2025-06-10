import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AccessKeyService } from './access_key.service';
import { CreateAccessKeyDto } from './dto/create-access_key.dto';
import { UpdateAccessKeyDto } from './dto/update-access_key.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('access-key')
export class AccessKeyController {
  constructor(private readonly accessKeyService: AccessKeyService) {}

  @Post()
  create(@Body() createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeyService.create(createAccessKeyDto);
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('projectId') projectId?: string,
    @Query('active') active?: boolean,
    @Query('project_name') project_name?: string,
  ) {
    const result = await this.accessKeyService.findAll(page, limit, { projectId, active, project_name });
    return {
      data: result.items,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accessKeyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAccessKeyDto: UpdateAccessKeyDto) {
    return this.accessKeyService.update(id, updateAccessKeyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accessKeyService.remove(id);
  }
}
