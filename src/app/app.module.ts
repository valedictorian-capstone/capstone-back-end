import {  Module, OnModuleInit } from '@nestjs/common';
import { AppProvider } from '@extras/providers';
import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  EXTRA_CONTROLLERS,
  FORM_CONTROLLERS
} from '@controllers';
import {
  BASIC_REPOSITORY,
  BPMN_REPOSITORY,
  FORM_REPOSITORY,
} from '@repositories';
import {
  BASIC_SERVICES, 
  BPMN_SERVICES, 
  EXTRA_SERVICES,
  FORM_SERVICE
} from '@services';
import { FILTERS } from '@extras/filters';
import { AppGateway } from '@extras/gateways';
import { AutoMapper, AutomapperModule, InjectMapper } from 'nestjsx-automapper';
import { AccountMapper, RoleMapper, FormControlMapper, FormDataMapper,FormGroupMapper,FormValueMapper } from './mappers';

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
    ...FORM_CONTROLLERS
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
    // this.mapper.addProfile(FormValueMapper)
  }
  
}
