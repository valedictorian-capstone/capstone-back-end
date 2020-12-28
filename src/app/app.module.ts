/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BASIC_CONTROLLERS,
  BPMN_CONTROLLERS,
  CUSTOMER_CONTROLLERS,
  EXTRA_CONTROLLERS,
  EMPLOYEE_CONTROLLERS,
  SERVICE_CONTROLLERS,
} from '@controllers';
import { FILTERS } from '@extras/filters';
import { AppGateway } from '@extras/gateways';
import { AppProvider } from '@extras/providers';
import { HttpModule, MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import {
  EMPLOYEE_REPOSITORIES,
  BASIC_REPOSITORIES,
  BPMN_REPOSITORIES,
  CUSTOMER_REPOSITORIES,
  PRODUCT_REPOSITORIES,
} from '@repositories';
import {
  EMPLOYEE_SERVICES,
  BASIC_SERVICES,
  BPMN_SERVICES,
  CUSTOMER_SERVICES,
  EXTRA_SERVICES,
  SERVICE_SERVICES,

} from '@services';
import { AutoMapper, AutomapperModule, InjectMapper } from 'nestjsx-automapper';
import {
  EmployeeMapper,
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
  DeviceMapper,
  LogMapper,
  CategoryMapper,
  AttachmentMapper,
  CommentMapper
} from './mappers';
import { environment } from 'src/environments/environment';
import {
  AuthMiddleware,
  AuthCustomerMiddleware
} from './middlewares';
import admin from 'firebase-admin';

import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        authorization: undefined,
        customer: undefined,
        account: undefined
      } // object of headers you want to set
    }),
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
    ...EMPLOYEE_CONTROLLERS,
    ...SERVICE_CONTROLLERS
  ],
  providers: [
    ...BASIC_SERVICES,
    ...EMPLOYEE_SERVICES,
    ...BPMN_SERVICES,
    ...CUSTOMER_SERVICES,
    ...SERVICE_SERVICES,
    ...EXTRA_SERVICES,
    ...EMPLOYEE_REPOSITORIES,
    ...BASIC_REPOSITORIES,
    ...BPMN_REPOSITORIES,
    ...CUSTOMER_REPOSITORIES,
    ...PRODUCT_REPOSITORIES,
    ...FILTERS,
    AppGateway,
    ...AppProvider.init(),
    AuthMiddleware,
    AuthCustomerMiddleware
  ],
})
export class AppModule implements OnModuleInit, NestModule {
  constructor(@InjectMapper() protected readonly mapper: AutoMapper) { }
  onModuleInit() {
    this.mapper.addProfile(EmployeeMapper);
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
    this.mapper.addProfile(DeviceMapper);
    this.mapper.addProfile(DealDetailMapper);
    this.mapper.addProfile(PipelineMapper);
    this.mapper.addProfile(NoteMapper);
    this.mapper.addProfile(LogMapper);
    this.mapper.addProfile(CategoryMapper);
    this.mapper.addProfile(CommentMapper);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthCustomerMiddleware)
      .forRoutes(
        { path: '/api/v1/Auth/Customer', method: RequestMethod.PUT },
        { path: '/api/v1/Event/Customer', method: RequestMethod.GET },
        { path: '/api/v1/Notification/Customer', method: RequestMethod.GET },
        { path: '/api/v1/Auth/Customer/profile', method: RequestMethod.PUT },
        { path: '/api/v1/Comment', method: RequestMethod.PUT },
        { path: '/api/v1/Ticket', method: RequestMethod.POST },
      );
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/v1/Search', method: RequestMethod.GET },
        // Auth
        { path: '/api/v1/Auth', method: RequestMethod.PUT },
        { path: '/api/v1/Auth/profile', method: RequestMethod.PUT },
        { path: '/api/v1/Auth/password', method: RequestMethod.PUT },
        // Notification
        { path: '/api/v1/Notification', method: RequestMethod.GET },
        // Activity
        { path: '/api/v1/Activity', method: RequestMethod.GET },
        { path: '/api/v1/Activity', method: RequestMethod.POST },
        { path: '/api/v1/Activity', method: RequestMethod.PUT },
        { path: '/api/v1/Activity/:id', method: RequestMethod.DELETE },
        // Attachment
        { path: '/api/v1/Attachment', method: RequestMethod.POST },
        { path: '/api/v1/Attachment', method: RequestMethod.PUT },
        { path: '/api/v1/Attachment/:id', method: RequestMethod.DELETE },
        // DealDetail
        { path: '/api/v1/DealDetail', method: RequestMethod.POST },
        { path: '/api/v1/DealDetail', method: RequestMethod.PUT },
        { path: '/api/v1/DealDetail/:id', method: RequestMethod.DELETE },
        // Note
        { path: '/api/v1/Note', method: RequestMethod.POST },
        { path: '/api/v1/Note', method: RequestMethod.PUT },
        { path: '/api/v1/Note/:id', method: RequestMethod.DELETE },
        // Pipeline
        { path: '/api/v1/Pipeline', method: RequestMethod.POST },
        { path: '/api/v1/Pipeline', method: RequestMethod.PUT },
        { path: '/api/v1/Pipeline/:id', method: RequestMethod.DELETE },
        { path: '/api/v1/Pipeline/restore/:id', method: RequestMethod.PUT },
        // Stage
        { path: '/api/v1/Stage', method: RequestMethod.POST },
        { path: '/api/v1/Stage', method: RequestMethod.PUT },
        { path: '/api/v1/Stage/:id', method: RequestMethod.DELETE },
        // Deal
        { path: '/api/v1/Deal', method: RequestMethod.GET },
        { path: '/api/v1/Deal/stage/:id', method: RequestMethod.GET },
        { path: '/api/v1/Deal', method: RequestMethod.POST },
        { path: '/api/v1/Deal', method: RequestMethod.PUT },
        { path: '/api/v1/Deal/:id', method: RequestMethod.DELETE },
        { path: '/api/v1/Deal/restore/:id', method: RequestMethod.PUT },
        // Employee
        { path: '/api/v1/Employee/import', method: RequestMethod.POST },
        { path: '/api/v1/Employee/:id', method: RequestMethod.DELETE },
        { path: '/api/v1/Employee', method: RequestMethod.GET },
        { path: '/api/v1/Employee', method: RequestMethod.POST },
        { path: '/api/v1/Employee', method: RequestMethod.PUT },
        { path: '/api/v1/Employee/restore/:id', method: RequestMethod.PUT },
        // Customer
        { path: '/api/v1/Customer/import', method: RequestMethod.POST },
        { path: '/api/v1/Customer', method: RequestMethod.GET },
        { path: '/api/v1/Customer/lead', method: RequestMethod.GET },
        { path: '/api/v1/Customer', method: RequestMethod.POST },
        { path: '/api/v1/Customer', method: RequestMethod.PUT },
        { path: '/api/v1/Customer/restore/:id', method: RequestMethod.PUT },
        { path: '/api/v1/Customer/:id', method: RequestMethod.DELETE },
        // Role
        { path: '/api/v1/Role', method: RequestMethod.GET },
        { path: '/api/v1/Role', method: RequestMethod.POST },
        { path: '/api/v1/Role', method: RequestMethod.PUT },
        { path: '/api/v1/Role/restore/:id', method: RequestMethod.PUT },
        { path: '/api/v1/Role/:id', method: RequestMethod.DELETE },
        // Product
        { path: '/api/v1/Product/import', method: RequestMethod.POST },
        { path: '/api/v1/Product', method: RequestMethod.POST },
        { path: '/api/v1/Product', method: RequestMethod.PUT },
        { path: '/api/v1/Product/restore/:id', method: RequestMethod.PUT },
        { path: '/api/v1/Product/:id', method: RequestMethod.DELETE },
        // Category
        { path: '/api/v1/Category', method: RequestMethod.POST },
        { path: '/api/v1/Category', method: RequestMethod.PUT },
        { path: '/api/v1/Category/restore/:id', method: RequestMethod.PUT },
        { path: '/api/v1/Category/:id', method: RequestMethod.DELETE },
        // Ticket
        { path: '/api/v1/Ticket', method: RequestMethod.GET },
        { path: '/api/v1/Ticket', method: RequestMethod.PUT },
        { path: '/api/v1/Ticket/:id', method: RequestMethod.DELETE },

      );
  }
}