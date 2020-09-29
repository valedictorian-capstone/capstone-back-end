import { AllExceptionsFilter } from '@extras/filters';
import { LogRequestInterceptor } from '@extras/intercepters/log.intercepter';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app/app.module';
declare const module: any;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const open = require("open");
(async () => {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LogRequestInterceptor())
  console.log(process.env.GGCLOUD_SQL_HOST)
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

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
})();
