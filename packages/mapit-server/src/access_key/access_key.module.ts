import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AccessKeyService } from './access_key.service';
import { AccessKeyController } from './access_key.controller';
import { AccessKey } from './entities/access_key.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessKey]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AccessKeyController],
  providers: [AccessKeyService],
  exports: [AccessKeyService],
})
export class AccessKeyModule {}
