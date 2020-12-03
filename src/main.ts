import { AllExceptionsFilter } from '@extras/filters';
import { LogRequestInterceptor } from '@extras/intercepters/log.intercepter';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express, { json, urlencoded } from 'express';
import { readFileSync } from 'fs';
import * as http from 'http';
import * as https from 'https';
import { AppModule } from 'src/app/app.module';
import terminalLink from 'terminal-link';
declare const module: any;
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const open = require("open");
(async () => {
  const server = express();
  server.use(urlencoded({ limit: 1024 * 1024 * 500, extended: true}));
  server.use(json({ limit: 1024 * 1024 * 500, type: 'application/json' }));
  // server.use((req: Request, res: Response, next: NextFunction) => {
  //   const origins = ["http://localhost:4200", "http://localhost:4300", "https://m-crm-admin.web.app", "https://m-crm-app.web.app"]
  //   const origin = req.headers.origin as any;
  //   if (origins.indexOf(origin) > -1) {
  //     res.setHeader("Access-Control-Allow-Origin", origin);
  //   }
  //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  //   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,authorization");
  //   next();
  // });
  const httpsOptions = {
    key: readFileSync('localhost.key'),
    cert: readFileSync('localhost.crt'),
  };
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
  await app.init();
  await app.listen(8080);
  // http.createServer(server).listen(8080);
//  https.createServer(httpsOptions, server).listen(8081);
  // eslint-disable-next-line @typescript-eslint/no-var-requires

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const local_http_link = terminalLink('HTTP Swagger', 'http://localhost:8080/api/v1/swagger', {
    fallback: (text, url) => text + ' : ' + url
  });
  console.log(local_http_link);
  const local_https_link = terminalLink('HTTPS Swagger', 'https://localhost:8081/api/v1/swagger', {
    fallback: (text, url) => text + ' : ' + url
  });
  console.log(local_https_link);
})();
