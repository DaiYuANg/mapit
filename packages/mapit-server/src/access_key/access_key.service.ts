import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessKey } from './entities/access_key.entity';
import { CreateAccessKeyDto } from './dto/create-access_key.dto';
import { UpdateAccessKeyDto } from './dto/update-access_key.dto';
import * as crypto from 'crypto';
import { generateId } from '../common/utils/id-generator';

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

  async create(createAccessKeyDto: CreateAccessKeyDto) {
    // 用雪花ID生成唯一 key
    let key: string;
    let exists = true;
    do {
      key = generateId() as string;
      exists = !!(await this.accessKeyRepo.findOne({ where: { key } }));
    } while (exists);
    // 生成 secret
    const secret = crypto.randomBytes(24).toString('hex');
    const entity = this.accessKeyRepo.create({
      ...createAccessKeyDto,
      key,
      secret,
    });
    return this.accessKeyRepo.save(entity);
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
