import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports : [PrismaService] //we need to export it so we can use it in all services
})
export class PrismaModule {}
