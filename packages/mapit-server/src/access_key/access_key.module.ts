import { Module } from '@nestjs/common';
import { AccessKeyService } from './access_key.service';
import { AccessKeyController } from './access_key.controller';

@Module({
  controllers: [AccessKeyController],
  providers: [AccessKeyService],
})
export class AccessKeyModule {}
