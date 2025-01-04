import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SeedService } from 'prisma/seed.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await seedService.seed(false);
  app.setGlobalPrefix('api');

  await app.listen(port, () =>
    console.log(`server run http://localhost:${port}/api`),
  );
}
bootstrap();
