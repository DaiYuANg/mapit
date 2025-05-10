import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessKeyService } from './access_key.service';
import { CreateAccessKeyDto } from './dto/create-access_key.dto';
import { UpdateAccessKeyDto } from './dto/update-access_key.dto';

@Controller('access-key')
export class AccessKeyController {
  constructor(private readonly accessKeyService: AccessKeyService) {}

  @Post()
  async create(@Body() createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeyService.create(createAccessKeyDto);
  }

  @Get()
  async findAll() {
    return this.accessKeyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.accessKeyService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccessKeyDto: UpdateAccessKeyDto) {
    return this.accessKeyService.update(+id, updateAccessKeyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.accessKeyService.remove(+id);
  }
}
