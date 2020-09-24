import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  EXTRA_CONTROLLERS,
  FORM_CONTROLLERS,
  CUSTOMER_CONTROLLERS
} from '@controllers';
import { FILTERS } from '@extras/filters';
import { AppGateway } from '@extras/gateways';
import { AppProvider } from '@extras/providers';
import { Module, OnModuleInit } from '@nestjs/common';
import {
  BASIC_REPOSITORY,
  BPMN_REPOSITORY,
  FORM_REPOSITORY,
  CUSTOMER_REPOSITORY
} from '@repositories';
import {
  BASIC_SERVICES,
  BPMN_SERVICES,
  EXTRA_SERVICES,
  FORM_SERVICE,
  CUSTOMER_SERVICES
} from '@services';
import { AutoMapper, AutomapperModule, InjectMapper } from 'nestjsx-automapper';
import {
  AccountMapper, FormControlMapper, FormDataMapper, FormGroupMapper, FormValueMapper, RoleMapper, WFMapper,
  CustomerExtraDataMapper, CustomerExtraInformationDataMapper, CustomerExtraInformationMapper, CustomerMapper, GroupMapper
} from './mappers';
import { WFConnectionMapper } from './mappers/bpmn-mappers/wf-connection.mapper';
import { WFStepMapper } from './mappers/bpmn-mappers/wf-step.mapper';


@Module({
  imports: [
    AutomapperModule.withMapper({
      throwError: true,
      skipUnmappedAssertion: true
    }),
  ],
  controllers: [
    ...BASIC_CONTROLLERS,
    ...EXTRA_CONTROLLERS,
    ...BPMN_CONTROLLERS,
    ...FORM_CONTROLLERS,
    ...CUSTOMER_CONTROLLERS,
  ],
  providers: [
    ...BASIC_SERVICES,
    ...EXTRA_SERVICES,
    ...BPMN_SERVICES,
    ...FORM_SERVICE,
    ...CUSTOMER_SERVICES,
    ...BASIC_REPOSITORY,
    ...BPMN_REPOSITORY,
    ...FORM_REPOSITORY,
    ...CUSTOMER_REPOSITORY,
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
    this.mapper.addProfile(FormControlMapper);
    this.mapper.addProfile(FormDataMapper);
    this.mapper.addProfile(FormGroupMapper);
    this.mapper.addProfile(FormValueMapper);
    this.mapper.addProfile(WFMapper);
    this.mapper.addProfile(WFStepMapper);
    this.mapper.addProfile(WFConnectionMapper);
    this.mapper.addProfile(CustomerExtraDataMapper);
    this.mapper.addProfile(CustomerExtraInformationDataMapper);
    this.mapper.addProfile(CustomerExtraInformationMapper);
    this.mapper.addProfile(CustomerMapper);
    this.mapper.addProfile(GroupMapper);
  }

}
