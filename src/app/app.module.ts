import { Inject, Module, OnModuleInit } from '@nestjs/common';
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
import { AutoMapper, AutomapperModule, InjectMapper } from 'nestjsx-automapper';
import { PascalCaseNamingConvention} from '@nartc/automapper';
import { AccountMapper, RoleMapper } from './mappers';

@Module({
  imports: [
    AutomapperModule.withMapper(),
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
    AppGateway,
    ...AppProvider.init()
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectMapper() protected readonly mapper: AutoMapper) { }
  onModuleInit() {
    this.mapper.addProfile(RoleMapper);
    this.mapper.addProfile(AccountMapper);
  }
  
}
