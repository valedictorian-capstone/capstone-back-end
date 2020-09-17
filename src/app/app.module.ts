import { Module } from '@nestjs/common';
import { SequelizeProvider } from 'src/app/extras/providers';
import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  EXTRA_CONTROLLERS
} from 'src/app/controllers';
import {
  BASIC_REPOSITORY,
  BPMN_REPOSITORY
} from 'src/app/repositories';
import {
  BASIC_SERVICES, BPMN_SERVICES, EXTRA_SERVICES
} from 'src/app/services';
import { FILTERS } from 'src/app/extras/filters';

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
    ...BASIC_REPOSITORY,
    ...BPMN_REPOSITORY,
    ...FILTERS
  ],
})
export class AppModule { }
