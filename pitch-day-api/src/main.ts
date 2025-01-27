import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Pitch-Day API')
    .addBearerAuth(
      { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .setVersion('1.0.0')
    .addTag('pitch-day')
    .setExternalDoc('Postman Collection', '/docs-json')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
