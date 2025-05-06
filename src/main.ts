import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('API for exploring Star Wars characters')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap()
  .catch((err) => {
    console.error('Error during bootstrap:', err);
    process.exit(1);
  })
  .finally(() => {
    console.log('Bootstrap process completed.');
  });
