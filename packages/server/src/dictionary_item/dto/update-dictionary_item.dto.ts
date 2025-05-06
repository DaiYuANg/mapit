import { PartialType } from '@nestjs/mapped-types';
import { CreateDictionaryItemDto } from './create-dictionary_item.dto';

export class UpdateDictionaryItemDto extends PartialType(CreateDictionaryItemDto) {}
