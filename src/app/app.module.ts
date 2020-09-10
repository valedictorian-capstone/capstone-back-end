import { Module } from '@nestjs/common';
import { BASIC_SERVICES, EXTRA_SERVICES, BPMN_SERVICES } from './services';
import {
  BASIC_CONTROLLERS,
  EXTRA_CONTROLLERS,
  BPMN_CONTROLLERS,
} from './controllers';
import { SequelizeProvider } from 'src/app/extras/providers/sequelize.provider';

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
  ],
})
export class AppModule {}
