import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKeyService } from './access_key.service';
import { AccessKeyController } from './access_key.controller';
import { AccessKey } from './entities/access_key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey])],
  controllers: [AccessKeyController],
  providers: [AccessKeyService],
  exports: [AccessKeyService],
})
export class AccessKeyModule {}
