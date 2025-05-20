import { PartialType } from '@nestjs/swagger';
import { CreateAccessKeyDto } from './create-access_key.dto';

export class UpdateAccessKeyDto extends PartialType(CreateAccessKeyDto) {}
