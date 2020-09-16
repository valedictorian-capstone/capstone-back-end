import { Module } from '@nestjs/common';
import { SequelizeProvider } from 'src/app/extras/providers/sequelize.provider';
import {
  BASIC_CONTROLLERS,

  BPMN_CONTROLLERS, EXTRA_CONTROLLERS
} from './controllers';
import { BASIC_PROVIDERS, BPMN_PROVIDERS } from './providers';
import { BASIC_SERVICES, BPMN_SERVICES, EXTRA_SERVICES } from './services';

@Module({
  imports: [],
  controllers: [
    ...BASIC_CONTROLLERS,
    ...EXTRA_CONTROLLERS,
    ...BPMN_CONTROLLERS,
  ],
  providers: [
    ...BASIC_SERVICES,
    ...EXTRA_SERVICES,
    ...BPMN_SERVICES, 
    SequelizeProvider.init(),
    ...BASIC_PROVIDERS,
    ...BPMN_PROVIDERS,
  ],
})
export class AppModule {}
