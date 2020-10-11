import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  CUSTOMER_CONTROLLERS, EXTRA_CONTROLLERS,
  FORM_CONTROLLERS
} from '@controllers';
import { FILTERS } from '@extras/filters';
import { AppGateway } from '@extras/gateways';
import { AppProvider } from '@extras/providers';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  BASIC_REPOSITORY,
  BPMN_REPOSITORY,

  CUSTOMER_REPOSITORY, FORM_REPOSITORY
} from '@repositories';
import {
  BASIC_SERVICES,
  BPMN_SERVICES,


  CUSTOMER_SERVICES, EXTRA_SERVICES,
  FORM_SERVICE
} from '@services';
import { AutoMapper, AutomapperModule, InjectMapper } from 'nestjsx-automapper';
import {
  AccountExtraInformationMapper, AccountExtraValueMapper, AccountMapper,
  CustomerExtraInformationDataMapper, CustomerExtraInformationMapper, CustomerMapper, DepartmentMapper, FormControlMapper, FormDataMapper, FormGroupMapper, FormValueMapper,
  GroupMapper,
  ProductExtraInformationMapper, ProductExtraValueMapper, ProductMapper, RoleMapper, WFMapper
} from './mappers';
import { WFConnectionMapper } from './mappers/bpmn-mappers/wf-connection.mapper';
import { WFStepMapper } from './mappers/bpmn-mappers/wf-step.mapper';


@Module({
  imports: [
    AutomapperModule.withMapper({
      throwError: true,
      skipUnmappedAssertion: true
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? process.env.NODE_ENV + '.env' : 'prod.env'
    }),
    JwtModule.register({
      secretOrPrivateKey: '10',
      signOptions: { expiresIn: '60s' },
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
    this.mapper.addProfile(CustomerExtraInformationDataMapper);
    this.mapper.addProfile(CustomerExtraInformationMapper);
    this.mapper.addProfile(CustomerMapper);
    this.mapper.addProfile(GroupMapper);
    this.mapper.addProfile(DepartmentMapper);
    this.mapper.addProfile(AccountExtraInformationMapper);
    this.mapper.addProfile(AccountExtraValueMapper);
    this.mapper.addProfile(ProductMapper);
    this.mapper.addProfile(ProductExtraInformationMapper);
    this.mapper.addProfile(ProductExtraValueMapper);
  }

}