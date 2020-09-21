import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  EXTRA_CONTROLLERS,
  FORM_CONTROLLERS
} from '@controllers';
import { FILTERS } from '@extras/filters';
import { AppGateway } from '@extras/gateways';
import { AppProvider } from '@extras/providers';
import { Module, OnModuleInit } from '@nestjs/common';
import {
  BASIC_REPOSITORY,
  BPMN_REPOSITORY,
  FORM_REPOSITORY
} from '@repositories';
import {
  BASIC_SERVICES,
  BPMN_SERVICES,
  EXTRA_SERVICES,
  FORM_SERVICE
} from '@services';
import { AutoMapper, AutomapperModule, InjectMapper } from 'nestjsx-automapper';
import { AccountMapper, FormControlMapper, FormDataMapper, FormGroupMapper, FormValueMapper, RoleMapper, WFMapper } from './mappers';

@Module({
  imports: [
    AutomapperModule.withMapper({
      throwError: false,
      skipUnmappedAssertion: true
    }),
  ],
  controllers: [
    ...BASIC_CONTROLLERS,
    ...EXTRA_CONTROLLERS,
    ...BPMN_CONTROLLERS,
    ...FORM_CONTROLLERS,
  ],
  providers: [
    ...BASIC_SERVICES,
    ...EXTRA_SERVICES,
    ...BPMN_SERVICES,
    ...FORM_SERVICE,
    ...BASIC_REPOSITORY,
    ...BPMN_REPOSITORY,
    ...FORM_REPOSITORY,
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
    // this.mapper.addProfile(FormControlMapper);
    // this.mapper.addProfile(FormDataMapper);
    // this.mapper.addProfile(FormGroupMapper);
    // this.mapper.addProfile(FormValueMapper);
    this.mapper.addProfile(WFMapper);
  }
  
}
