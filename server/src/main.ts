import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://127.0.0.1:5173",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Accept', 'Authorization', 'X-Requested-With', 'Origin']
  })
  await app.listen(3000);
}
bootstrap();
