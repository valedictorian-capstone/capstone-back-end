import { DealDetail } from "@models";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealDetailRepository } from "@repositories";
import { DEAL_DETAIL_REPOSITORY, SOCKET_SERVICE } from "@types";
import { DealDetailCM, DealDetailUM, DealDetailVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";
import { SocketService } from "../extra-services";


@Injectable()
export class DealDetailService {

  constructor(
    @Inject(DEAL_DETAIL_REPOSITORY) protected readonly dealDetailRepository: DealDetailRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<DealDetailVM[]> => {
    return await this.dealDetailRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ['product', 'deal'] })
      .then((models) => {
        return this.mapper.mapArray(models, DealDetailVM, DealDetail)
      });
  }

  public readonly findById = async (id: string): Promise<DealDetailVM> => {
    return await this.dealDetailRepository.useHTTP().findOne({ where: { id: id }, relations: ['product', 'deal'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, DealDetailVM, DealDetail)
        }
      })
  }

  public readonly checkUnique = async (label: string, value: string): Promise<boolean> => {
    const query = { [label]: value };
    return this.dealDetailRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      })
  }

  public readonly insert = async (body: DealDetailCM): Promise<DealDetailVM> => {
    return await this.dealDetailRepository.useHTTP().save(body as any)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('dealDetails', rs, 'create');
        return rs;
      })
  }

  public readonly update = async (body: DealDetailUM): Promise<DealDetailVM> => {
    return await this.dealDetailRepository.useHTTP()
      .save(body as any)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('dealDetails', rs, 'update');
        return rs;
      })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.dealDetailRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.dealDetailRepository.useHTTP()
        .remove(model)
          .then(() => {
            const rs = this.mapper.map({...model, id} as DealDetail, DealDetailVM, DealDetail);
            this.socketService.with('dealDetails', rs, 'remove');
            return rs;
          })
      });
  }
}