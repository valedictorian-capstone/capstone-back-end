import { AllExceptionsFilter } from '@extras/filters';
import { LogRequestInterceptor } from '@extras/intercepters/log.intercepter';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FirebaseService } from '@services';
import { json, urlencoded, NextFunction, Request, Response } from 'express';
import { AppModule } from 'src/app/app.module';
declare const module: any;
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const open = require("open");
(async () => {
  const origins = ["http://localhost:8080", "https://crm-capstione-be.azurewebsites.net", "http://localhost:4200", "https://m-crm-admin.web.app", "https://m-crm-app.web.app"]
  const app = await NestFactory.create(AppModule, {
    logger: true, cors: true, bodyParser: true
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LogRequestInterceptor());
  app.use(urlencoded({ limit: 1024 * 1024 * 500, extended: true, type: 'application/x-www-form-urlencoding' }));
  app.use(json({ limit: 1024 * 1024 * 500, type: 'application/json' }));
  const options = new DocumentBuilder()
    .setTitle('CRM BE')
    .setDescription('ALL API OF CRM')
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', description: 'Copy valid JWT token into field', name: 'Authorization', in: 'header', bearerFormat: 'Bearer' }, 'JWT')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const styles = {
    customCss: ".swagger-ui table tbody tr td:first-of-type {max-width : 30%} .swagger-ui .parameters-col_description {width:70%}",
  };
  SwaggerModule.setup('api/v1/swagger', app, document, styles);

  await app.listen(8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
})();
