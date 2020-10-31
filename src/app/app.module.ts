/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  CUSTOMER_CONTROLLERS,
  EXTRA_CONTROLLERS,
  FORM_CONTROLLERS,
  ACCOUNT_CONTROLLERS,
  SERVICE_CONTROLLERS
} from '@controllers';
import { FILTERS } from '@extras/filters';
import { AppGateway } from '@extras/gateways';
import { AppProvider } from '@extras/providers';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import {
  ACCOUNT_REPOSITORIES,
  BASIC_REPOSITORIES,
  BPMN_REPOSITORIES,
  CUSTOMER_REPOSITORIES,
  FORM_REPOSITORIES,
  SERVICE_REPOSITORIES,
} from '@repositories';
import {
  ACCOUNT_SERVICES,
  BASIC_SERVICES,
  BPMN_SERVICES,
  CUSTOMER_SERVICES,
  EXTRA_SERVICES,
  FORM_SERVICES,
  SERVICE_SERVICES,

} from '@services';
import { AutoMapper, AutomapperModule, InjectMapper } from 'nestjsx-automapper';
import {
  AccountMapper,
  CustomerMapper,
  DepartmentMapper,
  FormControlMapper,
  FormDataMapper,
  FormGroupMapper,
  GroupMapper,
  ServiceMapper,
  WFConnectionMapper,
  WFMapper,
  WFStepMapper,
  NotificationMapper,
  CommentMapper,
  WFStepInstanceMapper,
  AccountDepartmentMapper,
  RoleMapper,
  TaskMapper
} from './mappers';
import { environment } from 'src/environments/environment';
import admin from 'firebase-admin';


@Module({
  imports: [
    AutomapperModule.withMapper({
      throwError: true,
      skipUnmappedAssertion: true,
      useUndefined: true,
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.WEBSITE_SKU ? 'prod.env' : '.env'
    }),
    JwtModule.register({
      secretOrPrivateKey: '10',
      signOptions: { expiresIn: '60s' },
    }),
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(require('../../service-account.json')),
        databaseURL: environment.firebase.databaseURL,
      })
    }),
  ],
  controllers: [
    ...BASIC_CONTROLLERS,
    ...EXTRA_CONTROLLERS,
    ...BPMN_CONTROLLERS,
    ...FORM_CONTROLLERS,
    ...CUSTOMER_CONTROLLERS,
    ...ACCOUNT_CONTROLLERS,
    ...SERVICE_CONTROLLERS
  ],
  providers: [
    ...BASIC_SERVICES,
    ...ACCOUNT_SERVICES,
    ...BPMN_SERVICES,
    ...FORM_SERVICES,
    ...CUSTOMER_SERVICES,
    ...SERVICE_SERVICES,
    ...EXTRA_SERVICES,
    ...ACCOUNT_REPOSITORIES,
    ...BASIC_REPOSITORIES,
    ...BPMN_REPOSITORIES,
    ...CUSTOMER_REPOSITORIES,
    ...FORM_REPOSITORIES,
    ...SERVICE_REPOSITORIES,
    ...FILTERS,
    AppGateway,
    ...AppProvider.init()
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectMapper() protected readonly mapper: AutoMapper) { }
  onModuleInit() {
    this.mapper.addProfile(AccountMapper);
    this.mapper.addProfile(CustomerMapper);
    this.mapper.addProfile(DepartmentMapper);
    this.mapper.addProfile(FormControlMapper);
    this.mapper.addProfile(FormDataMapper);
    this.mapper.addProfile(FormGroupMapper);
    this.mapper.addProfile(GroupMapper);
    this.mapper.addProfile(ServiceMapper);
    this.mapper.addProfile(WFConnectionMapper);
    this.mapper.addProfile(WFMapper);
    this.mapper.addProfile(WFStepInstanceMapper)
    this.mapper.addProfile(WFStepMapper);
    this.mapper.addProfile(NotificationMapper);
    this.mapper.addProfile(CommentMapper);
    this.mapper.addProfile(AccountDepartmentMapper);
    this.mapper.addProfile(RoleMapper);
    this.mapper.addProfile(TaskMapper);
  }

}