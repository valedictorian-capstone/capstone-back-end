import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CRMRepository } from 'src/app/extras/repositories';
import { WorkFlowInstance } from 'src/app/models';

export class WorkFlowInstanceRepository extends CRMRepository<WorkFlowInstance> {
  constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize,) {
    super(WorkFlowInstance, sequelize);
  }
}
