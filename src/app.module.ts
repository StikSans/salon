import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SeedService } from 'prisma/seed.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../src', 'public'), // Путь к папке с файлами
      serveRoot: '/files', // Базовый URL для доступа к файлам
    }),
    FileModule,
  ],
  providers: [SeedService, PrismaService],
})
export class AppModule {}
