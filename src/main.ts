import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
declare const module: any;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const open = require("open");
(async () => {
  const app = await NestFactory.create(AppModule);
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

  open("http://localhost:3000/api/v1/swagger");
})();
