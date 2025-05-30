import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessKey } from './entities/access_key.entity';
import { CreateAccessKeyDto } from './dto/create-access_key.dto';
import { UpdateAccessKeyDto } from './dto/update-access_key.dto';

@Injectable()
export class AccessKeyService {
  constructor(
    @InjectRepository(AccessKey)
    private readonly accessKeyRepo: Repository<AccessKey>,
  ) {}

  async validate(key: string): Promise<boolean> {
    const found = await this.accessKeyRepo.findOne({ where: { key, active: true } });
    return !!found;
  }

  create(createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeyRepo.save(createAccessKeyDto);
  }

  findAll() {
    return this.accessKeyRepo.find();
  }

  findOne(id: number) {
    return this.accessKeyRepo.findOne({ where: { id: String(id) } });
  }

  update(id: number, updateAccessKeyDto: UpdateAccessKeyDto) {
    return this.accessKeyRepo.update(id, updateAccessKeyDto);
  }

  remove(id: number) {
    return this.accessKeyRepo.delete(id);
  }
}
