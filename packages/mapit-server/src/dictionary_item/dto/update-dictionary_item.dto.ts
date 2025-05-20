import { PartialType } from '@nestjs/swagger';
import { CreateDictionaryItemDto } from './create-dictionary_item.dto';

export class UpdateDictionaryItemDto extends PartialType(CreateDictionaryItemDto) {}
