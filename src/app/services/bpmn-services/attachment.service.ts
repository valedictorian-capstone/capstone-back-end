import { Attachment } from "@models";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AttachmentRepository } from "@repositories";
import { FirebaseService, SocketService } from "@services";
import { ATTACHMENT_REPOSITORY, FIREBASE_SERVICE, SOCKET_SERVICE } from "@types";
import { AttachmentCM, AttachmentUM, AttachmentVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { environment } from "src/environments/environment";
import { In } from "typeorm";

@Injectable()
export class AttachmentService {
  //
  constructor(
    @Inject(ATTACHMENT_REPOSITORY) protected readonly attachmentRepository: AttachmentRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (ids?: string[]): Promise<AttachmentVM[]> => {
    return await this.attachmentRepository.useHTTP().find({ where: ids ? { id: In(ids) } : {}, relations: ['deal'] })
      .then((models) => {
        return this.mapper.mapArray(models, AttachmentVM, Attachment)
      });
  }
  public readonly findById = async (id: string): Promise<AttachmentVM> => {
    return await this.attachmentRepository.useHTTP().findOne({ where: { id: id }, relations: ['deal'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        } else {
          return this.mapper.map(model, AttachmentVM, Attachment)
        }
      })
  }
  public readonly insert = async (body: any, files: File[]): Promise<AttachmentVM[]> => {
    const deal = { id: body.deal[0] };
    const attachments: AttachmentCM[] = [];
    for (let i = 0; i < files.length / 2; i++) {
      const file = files[i];
      const time = new Date().getTime();
      await this.firebaseService.useUploadFile(
        "attachments/" + deal.id + '/' + time + (file as any).originalname, file);
      attachments.push({
        deal: deal as any,
        name: time + (file as any).originalname,
        extension: (file as any).mimetype,
        url: environment.firebase.linkDownloadFile + "attachments/" + deal.id + '/' + time + (file as any).originalname,
        size: (file as any).size,
        description: ''
      });
    }
    return await this.attachmentRepository.useHTTP()
      .save(attachments as any)
      .then(async (models: Attachment[]) => {
        const rs = await this.findAll(models.map((e) => e.id));
        this.socketService.with('attachments', rs, 'list');
        return rs
      })
  }
  public readonly update = async (body: AttachmentUM): Promise<AttachmentVM> => {
    return await this.attachmentRepository.useHTTP()
      .save(body as any)
      .then(async (model) => {
        const rs = await this.findById(model.id);
        this.socketService.with('attachments', rs, 'update');
        return rs
      })
  }
  public readonly remove = async (id: string): Promise<any> => {
    return await this.attachmentRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.attachmentRepository.useHTTP()
        .remove(model)
          .then(() => {
            const rs = this.mapper.map({...model, id} as Attachment, AttachmentVM, Attachment);
            this.socketService.with('attachments', rs, 'remove');
            return rs;
          })
      });
  }
}