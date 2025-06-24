import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initPixstore } from './init-pixstore';
import { seedDatabase } from './seed-database';

async function bootstrap() {
  // IMPORTANT: Always initialize Pixstore before using any Pixstore features.
  initPixstore();
  await seedDatabase();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
