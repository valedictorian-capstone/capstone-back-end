import { Log } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealRepository, LogRepository } from "@repositories";
import { DEAL_REPOSITORY, LOG_REPOSITORY } from "@types";
import { LogCM, LogUM, LogVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

import { In } from "typeorm";

@Injectable()
export class LogService {

  constructor(
    @Inject(LOG_REPOSITORY) protected readonly logRepository: LogRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<LogVM[]> => {
    return await this.logRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: [] })
      .then((models) => {
        return this.mapper.mapArray(models, LogVM, Log)
      });
  }

  public readonly findByDeal = async (id: string): Promise<LogVM[]> => {

    return await this.logRepository.useHTTP().find({ where: { deal: { id } }, relations: ['deal'] })
      .then((models) => {
        return this.mapper.mapArray(models, LogVM, Log)
      });
  }

  public readonly findById = async (id: string): Promise<LogVM> => {
    return await this.logRepository.useHTTP().findOne({ where: { id: id }, relations: [] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, LogVM, Log)
        }
      })
  }

  public readonly insert = async (body: LogCM): Promise<LogVM> => {
    return await this.logRepository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: LogUM): Promise<LogVM> => {
    return await this.logRepository.useHTTP()
      .save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.logRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.logRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  }
}