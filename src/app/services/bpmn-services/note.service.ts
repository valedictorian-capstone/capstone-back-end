import { Note } from "@models";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DealRepository, NoteRepository } from "@repositories";
import { DEAL_REPOSITORY, NOTE_REPOSITORY, SOCKET_SERVICE } from "@types";
import { NoteCM, NoteUM, NoteVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { In } from "typeorm";
import { SocketService } from "../extra-services";


@Injectable()
export class NoteService {

  constructor(
    @Inject(NOTE_REPOSITORY) protected readonly noteRepository: NoteRepository,
    @Inject(DEAL_REPOSITORY) protected readonly dealRepository: DealRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
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

    return await this.noteRepository.useHTTP().save(body)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('notes', rs, 'create');
        return rs;
      })
  }

  public readonly update = async (body: NoteUM): Promise<NoteVM> => {
    return await this.noteRepository.useHTTP()
      .save(body)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('notes', rs, 'update');
        return rs;
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
            const rs = this.mapper.map({...model, id} as Note, NoteVM, Note);
            this.socketService.with('notes', rs, 'remove');
            return rs;
          })
      });
  }
}