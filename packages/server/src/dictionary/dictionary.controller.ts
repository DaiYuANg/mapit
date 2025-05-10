import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  async create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto);
  }

  @Get()
  async findAll() {
    return this.dictionaryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dictionaryService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDictionaryDto: UpdateDictionaryDto) {
    return this.dictionaryService.update(+id, updateDictionaryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dictionaryService.remove(+id);
  }
}
