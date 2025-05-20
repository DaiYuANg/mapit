import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DictionaryItemService } from './dictionary_item.service';
import { CreateDictionaryItemDto } from './dto/create-dictionary_item.dto';
import { UpdateDictionaryItemDto } from './dto/update-dictionary_item.dto';

@Controller('dictionary-item')
export class DictionaryItemController {
  constructor(private readonly dictionaryItemService: DictionaryItemService) {}

  @Post()
  create(@Body() createDictionaryItemDto: CreateDictionaryItemDto) {
    return this.dictionaryItemService.create(createDictionaryItemDto);
  }

  @Get()
  findAll() {
    return this.dictionaryItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictionaryItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDictionaryItemDto: UpdateDictionaryItemDto) {
    return this.dictionaryItemService.update(+id, updateDictionaryItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictionaryItemService.remove(+id);
  }
}
