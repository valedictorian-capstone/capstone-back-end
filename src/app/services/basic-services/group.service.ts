import { NotFoundException } from '@exceptions';
import { Group } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { GroupRepository } from '@repositories';
import { GROUP_REPOSITORY } from '@types';
import { GroupCM, GroupUM, GroupVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<GroupVM[]> => {
    return await this.groupRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["customers"] })
      .then((models) => this.mapper.mapArray(models, GroupVM, Group))
  };

  public readonly findById = async (id: string): Promise<GroupVM> => {
    return await this.groupRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, GroupVM, Group);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: GroupCM): Promise<GroupVM> => {
    return this.groupRepository.useHTTP().insert(body)
      .then((model) => {
        return this.findById(model.generatedMaps[0].id);
      })
  };

  public readonly update = async (body: GroupUM): Promise<GroupVM> => {
    return await this.groupRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.groupRepository.useHTTP()
          .save(body)
          .then(() => {
            return this.findById(model.id);
          })
      });
  };

  public readonly remove = async (id: string): Promise<GroupVM> => {
    return await this.groupRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.groupRepository.useHTTP()
          .save({ id, isDelete: true })
          .then(() => {
            return this.findById(id);
          })
      });
  };

  public readonly restore = async (id: string): Promise<GroupVM> => {
    return await this.groupRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.groupRepository.useHTTP()
          .save({ id, isDelete: false })
          .then(() => {
            return this.findById(id);
          })
      });
  };
}
