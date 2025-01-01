import { NestFactory } from '@nestjs/core';
import { SeedService } from 'prisma/seed.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);
  const port = process.env.PORT || 3000;

  await seedService.seed(true);
  app.setGlobalPrefix('api');

  await app.listen(port, () =>
    console.log(`server run http://localhost:${port}/api`),
  );
}
bootstrap();
