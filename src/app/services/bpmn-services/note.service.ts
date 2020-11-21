import { Note } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealRepository, NoteRepository } from "@repositories";
import { DEAL_REPOSITORY, NOTE_REPOSITORY } from "@types";
import { NoteCM, NoteUM, NoteVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";

import { In } from "typeorm";

@Injectable()
export class NoteService {

  constructor(
    @Inject(NOTE_REPOSITORY) protected readonly noteRepository: NoteRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<NoteVM[]> => {
    return await this.noteRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: [] })
      .then((models) => {
        return this.mapper.mapArray(models, NoteVM, Note)
      });
  }

  public readonly findByDeal = async (id: string): Promise<NoteVM[]> => {
    return await this.noteRepository.useHTTP().find({ where: { deal: { id } }, relations: ['deal'] })
      .then((models) => {
        return this.mapper.mapArray(models, NoteVM, Note)
      });
  }

  public readonly findById = async (id: string): Promise<NoteVM> => {
    return await this.noteRepository.useHTTP().findOne({ where: { id: id }, relations: ['deal'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, NoteVM, Note)
        }
      })
  }

  public readonly insert = async (body: NoteCM): Promise<NoteVM> => {

    const deal = await this.dealRepository.useHTTP().findOne(body.deal.id)

    return await this.noteRepository.useHTTP().save(body)
      .then((model) => {
        this.noteRepository.useHTTP().save({ ...model, deal: deal })
        return this.findById(model.id);
      })
  }

  public readonly update = async (body: NoteUM): Promise<NoteVM> => {
    return await this.noteRepository.useHTTP()
      .save(body)
      .then((model) => {
        return this.findById(model.id);
      })
  }

  public readonly remove = async (id: string): Promise<any> => {
    return await this.noteRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.noteRepository.useHTTP()
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