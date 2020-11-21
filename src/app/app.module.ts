/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  CUSTOMER_CONTROLLERS,
  EXTRA_CONTROLLERS,
  ACCOUNT_CONTROLLERS,
  SERVICE_CONTROLLERS,
} from '@controllers';
import { FILTERS } from '@extras/filters';
import { AppGateway } from '@extras/gateways';
import { AppProvider } from '@extras/providers';
import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import {
  ACCOUNT_REPOSITORIES,
  BASIC_REPOSITORIES,
  BPMN_REPOSITORIES,
  CUSTOMER_REPOSITORIES,
  PRODUCT_REPOSITORIES,
} from '@repositories';
import {
  ACCOUNT_SERVICES,
  BASIC_SERVICES,
  BPMN_SERVICES,
  CUSTOMER_SERVICES,
  EXTRA_SERVICES,
  SERVICE_SERVICES,

} from '@services';
import { AutoMapper, AutomapperModule, InjectMapper } from 'nestjsx-automapper';
import {
  AccountMapper,
  CustomerMapper,
  GroupMapper,
  ProductMapper,
  StageMapper,
  NotificationMapper,
  RoleMapper,
  TicketMapper,
  ActivityMapper,
  EventMapper,
  TriggerMapper,
  DealMapper,
  PipelineMapper,
  DealDetailMapper,
  NoteMapper,
  LogMapper,
  CategoryMapper,
  AttachmentMapper
} from './mappers';
import { environment } from 'src/environments/environment';
import {
  AuthMiddleware
} from './middlewares';
import admin from 'firebase-admin';

import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AutomapperModule.withMapper({
      throwError: true,
      skipUnmappedAssertion: true,
      useUndefined: true,
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.WEBSITE_SKU ? 'prod.env' : '.env',
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
    ScheduleModule.forRoot()
  ],
  controllers: [
    ...BASIC_CONTROLLERS,
    ...EXTRA_CONTROLLERS,
    ...BPMN_CONTROLLERS,
    ...CUSTOMER_CONTROLLERS,
    ...ACCOUNT_CONTROLLERS,
    ...SERVICE_CONTROLLERS
  ],
  providers: [
    ...BASIC_SERVICES,
    ...ACCOUNT_SERVICES,
    ...BPMN_SERVICES,
    ...CUSTOMER_SERVICES,
    ...SERVICE_SERVICES,
    ...EXTRA_SERVICES,
    ...ACCOUNT_REPOSITORIES,
    ...BASIC_REPOSITORIES,
    ...BPMN_REPOSITORIES,
    ...CUSTOMER_REPOSITORIES,
    ...PRODUCT_REPOSITORIES,
    ...FILTERS,
    AppGateway,
    ...AppProvider.init(),
    AuthMiddleware
  ],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(@InjectMapper() protected readonly mapper: AutoMapper) { }
  onModuleInit() {
    this.mapper.addProfile(AccountMapper);
    this.mapper.addProfile(CustomerMapper);
    this.mapper.addProfile(GroupMapper);
    this.mapper.addProfile(ProductMapper);
    this.mapper.addProfile(StageMapper);
    this.mapper.addProfile(NotificationMapper);
    this.mapper.addProfile(RoleMapper);
    this.mapper.addProfile(TicketMapper);
    this.mapper.addProfile(ActivityMapper);
    this.mapper.addProfile(AttachmentMapper);
    this.mapper.addProfile(EventMapper);
    this.mapper.addProfile(TriggerMapper);
    this.mapper.addProfile(DealMapper);
    this.mapper.addProfile(DealDetailMapper);
    this.mapper.addProfile(PipelineMapper);
    this.mapper.addProfile(NoteMapper);
    this.mapper.addProfile(LogMapper);
    this.mapper.addProfile(CategoryMapper);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/v1/Auth', method: RequestMethod.GET },
        // { path: '/api/v1/Account', method: RequestMethod.GET }
      );
  }
}