import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { AccessKey } from './entities/access_key.entity';
import { CreateAccessKeyDto } from './dto/create-access_key.dto';
import { UpdateAccessKeyDto } from './dto/update-access_key.dto';
import * as crypto from 'crypto';
import { Permission } from './permission';
import { v7 as uuidv7 } from 'uuid';

interface AccessKeyFilters {
  projectId?: string;
  active?: boolean;
  project_name?: string;
}

@Injectable()
export class AccessKeyService {
  constructor(
    @InjectRepository(AccessKey)
    private readonly accessKeyRepo: Repository<AccessKey>,
  ) {}

  async validate(key: string): Promise<boolean> {
    const found = await this.accessKeyRepo.findOne({
      where: {
        key,
        active: true,
        expiresAt: MoreThan(new Date()),
      },
    });
    return !!found;
  }

  async validateWithSecret(key: string, secret: string): Promise<AccessKey | null> {
    const found = await this.accessKeyRepo.findOne({
      where: {
        key,
        active: true,
        expiresAt: MoreThan(new Date()),
      },
    });

    if (!found) {
      return null;
    }

    // 验证 secret
    const isValid = crypto.timingSafeEqual(Buffer.from(found.secret), Buffer.from(secret));

    return isValid ? found : null;
  }

  async create(createAccessKeyDto: CreateAccessKeyDto) {
    // 生成 secret
    const secret = crypto.randomBytes(24).toString('hex');

    const key = uuidv7();

    const entity = this.accessKeyRepo.create({
      ...createAccessKeyDto,
      permissions: [Permission.READ],
      secret,
      key,
      usageCount: 0,
    });

    return this.accessKeyRepo.save(entity);
  }

  async findAll(page = 1, limit = 10, filters?: AccessKeyFilters) {
    const query = this.accessKeyRepo.createQueryBuilder('access_key');

    if (filters) {
      if (filters.projectId) {
        query.andWhere('access_key.projectId = :projectId', { projectId: filters.projectId });
      }
      if (filters.active !== undefined) {
        query.andWhere('access_key.active = :active', { active: filters.active });
      }
      if (filters.project_name) {
        query.andWhere('access_key.project_name LIKE :project_name', { project_name: `%${filters.project_name}%` });
      }
    }

    const [items, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const accessKey = await this.accessKeyRepo.findOne({
      where: { id: String(id) },
      relations: ['project'],
    });

    if (!accessKey) {
      throw new NotFoundException(`AccessKey with ID ${id} not found`);
    }

    return accessKey;
  }

  async update(id: number, updateAccessKeyDto: UpdateAccessKeyDto) {
    const accessKey = await this.findOne(id);

    // 只更新允许的字段
    const allowedFields = {
      active: updateAccessKeyDto.active,
      projectId: updateAccessKeyDto.projectId,
      project_name: updateAccessKeyDto.project_name as string,
      expires_at: updateAccessKeyDto.expires_at,
      permissions: updateAccessKeyDto.permissions,
      remark: updateAccessKeyDto.remark,
    };

    Object.assign(accessKey, allowedFields);
    return this.accessKeyRepo.save(accessKey);
  }

  async remove(id: number) {
    const accessKey = await this.findOne(id);
    return this.accessKeyRepo.remove(accessKey);
  }

  async resetSecret(id: number) {
    const accessKey = await this.findOne(id);
    accessKey.secret = crypto.randomBytes(24).toString('hex');
    return this.accessKeyRepo.save(accessKey);
  }

  async renew(id: number, days: number) {
    const accessKey = await this.findOne(id);
    accessKey.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return this.accessKeyRepo.save(accessKey);
  }

  async updateUsage(id: string): Promise<void> {
    await this.accessKeyRepo.update(id, {
      usageCount: () => 'usage_count + 1',
      lastUsedAt: new Date(),
    });
  }

  async validateKey(key: string, secret: string) {
    return this.accessKeyRepo.findOne({
      where: {
        key,
        secret,
      },
    });
  }
}
