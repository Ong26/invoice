import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const loadSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Invoice API')
    .setDescription('API Documentation for Invoice')
    .setVersion('1.0')
    .addCookieAuth(
      'access-token',
      {
        type: 'http',
        in: 'cookie',
        scheme: 'Bearer',
      },
      'access-token',
    )
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
