import { Injectable } from '@nestjs/common';
import { CreateDictionaryItemDto } from './dto/create-dictionary_item.dto';
import { UpdateDictionaryItemDto } from './dto/update-dictionary_item.dto';

@Injectable()
export class DictionaryItemService {
  create(createDictionaryItemDto: CreateDictionaryItemDto) {
    return 'This action adds a new dictionaryItem';
  }

  findAll() {
    return `This action returns all dictionaryItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dictionaryItem`;
  }

  update(id: number, updateDictionaryItemDto: UpdateDictionaryItemDto) {
    return `This action updates a #${id} dictionaryItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} dictionaryItem`;
  }
}
