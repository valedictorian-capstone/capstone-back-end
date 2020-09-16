import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CRMRepository } from 'src/app/extras/repositories';
import { WorkFlow } from 'src/app/models';

export class WorkFlowRepository extends CRMRepository<WorkFlow> {
  constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize,) {
    super(WorkFlow, sequelize);
  }
}
