import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CRMRepository } from 'src/app/extras/repositories';
import { Role } from 'src/app/models';

export class RoleRepository extends CRMRepository<Role> {
  constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize,) {
    super(Role, sequelize);
  }
}
