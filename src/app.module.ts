import { Module } from '@nestjs/common';
import { SeedService } from 'prisma/seed.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [SeedService, PrismaService],
})
export class AppModule {}
