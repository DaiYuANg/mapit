import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccessKeyDto } from './dto/create-access_key.dto';
import { UpdateAccessKeyDto } from './dto/update-access_key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from './entities/access_key.entity';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class AccessKeyService {
  constructor(
    @InjectRepository(AccessKey)
    private accessKeyRepository: Repository<AccessKey>,
  ) {}

  async createAccessKey(project: Project): Promise<AccessKey> {
    const accessKey = this.accessKeyRepository.create({
      key: this.generateRandomKey(),
      secret: this.generateRandomSecret(),
      project: project,
      status: 'active',
    });

    return this.accessKeyRepository.save(accessKey);
  }

  // 生成一个随机的 AccessKey
  private generateRandomKey(): string {
    return uuidv4();
  }

  // 生成随机的 secret
  private generateRandomSecret(): string {
    return crypto.randomBytes(32).toString('hex'); // 生成一个随机的 32 字节长度的 secret
  }

  async create(createAccessKeyDto: CreateAccessKeyDto) {
    const accessKey = this.accessKeyRepository.create(createAccessKeyDto);
    return this.accessKeyRepository.save(accessKey);
  }

  async findAll() {
    return await this.accessKeyRepository.find({
      relations: ['project'],
    });
  }

  async findOne(id: number) {
    return this.accessKeyRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateAccessKeyDto: UpdateAccessKeyDto) {
    await this.accessKeyRepository.update(id, updateAccessKeyDto);
    return this.accessKeyRepository.save(updateAccessKeyDto);
  }

  async remove(id: number) {
    const toDelete = await this.findOne(id);
    if (!toDelete) {
      throw new NotFoundException(`Dictionary with id ${id} not found`);
    }
    await this.accessKeyRepository.delete(id);
    return { success: true };
  }
}
