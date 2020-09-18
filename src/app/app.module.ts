import { Module } from '@nestjs/common';
import { AppProvider } from '@extras/providers';
import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  EXTRA_CONTROLLERS
} from '@controllers';
import {
  BASIC_REPOSITORY,
  BPMN_REPOSITORY
} from '@repositories';
import {
  BASIC_SERVICES, BPMN_SERVICES, EXTRA_SERVICES
} from '@services';
import { FILTERS } from '@extras/filters';
import { AppGateway } from '@extras/gateways';
import { AutomapperModule } from 'nestjsx-automapper';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AutomapperModule.withMapper(),
    TypeOrmModule.forRoot(AppProvider.init())
  ],
  controllers: [
    ...BASIC_CONTROLLERS,
    ...EXTRA_CONTROLLERS,
    ...BPMN_CONTROLLERS,
  ],
  providers: [
    ...BASIC_SERVICES,
    ...EXTRA_SERVICES,
    ...BPMN_SERVICES,
    ...BASIC_REPOSITORY,
    ...BPMN_REPOSITORY,
    ...FILTERS,
    AppGateway
  ],
})
export class AppModule { }
