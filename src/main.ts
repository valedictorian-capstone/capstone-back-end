import { AllExceptionsFilter } from '@extras/filters';
import { LogRequestInterceptor } from '@extras/intercepters/log.intercepter';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express, { urlencoded, json, Request, Response, NextFunction } from 'express';
import { AppModule } from 'src/app/app.module';
declare const module: any;
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const open = require("open");
(async () => {
  const server = express();
  server.use(urlencoded({ limit: 1024 * 1024 * 500, extended: true, type: 'application/x-www-form-urlencoding' }));
  server.use(json({ limit: 1024 * 1024 * 500, type: 'application/json' }));
  // server.use((req: Request, res: Response, next: NextFunction) => {
  //   const origins = ["http://localhost:8080", "https://m-crm-company.ts.r.appspot.com/", "https://crm-capstione-be.azurewebsites.net", "http://localhost:4200", "http://localhost:4300", "https://m-crm-admin.web.app", "https://m-crm-app.web.app"]
  //   const origin = req.headers.origin as any;
  //   if (origins.indexOf(origin) > -1) {
  //     res.setHeader("Access-Control-Allow-Origin", origin);
  //   }
  //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  //   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,authorization");
  //   next();
  // });
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LogRequestInterceptor());
  app.enableCors();
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
