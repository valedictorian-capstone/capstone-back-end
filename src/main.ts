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
  const app = await NestFactory.create(AppModule, { logger: true, bodyParser: true });
  const allowedOrigins = ["http://localhost:4200", "https://m-crm-admin.web.app", "https://m-crm-app.web.app"];
  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  })
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

  // FirebaseService.init();
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
