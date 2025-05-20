import { Injectable } from '@nestjs/common';
import { CreateAccessKeyDto } from './dto/create-access_key.dto';
import { UpdateAccessKeyDto } from './dto/update-access_key.dto';

@Injectable()
export class AccessKeyService {
  create(createAccessKeyDto: CreateAccessKeyDto) {
    return 'This action adds a new accessKey';
  }

  findAll() {
    return `This action returns all accessKey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessKey`;
  }

  update(id: number, updateAccessKeyDto: UpdateAccessKeyDto) {
    return `This action updates a #${id} accessKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessKey`;
  }
}
