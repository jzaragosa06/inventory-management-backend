import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function swaggerSetup(app: INestApplication): void {
  //configuration of swagger
  const config = new DocumentBuilder()
    .setTitle('Inventory Management API')
    .setDescription('API documentation for Inventory Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
