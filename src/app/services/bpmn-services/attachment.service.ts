import { Attachment } from "@models";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AttachmentRepository, LogRepository } from "@repositories";
import { FirebaseService, SocketService } from "@services";
import { ATTACHMENT_REPOSITORY, FIREBASE_SERVICE, LOG_REPOSITORY, SOCKET_SERVICE } from "@types";
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
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
    @Inject(LOG_REPOSITORY) protected readonly logRepository: LogRepository,
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
  public readonly query = async (key: string, id: string): Promise<AttachmentVM[]> => {
    return await this.attachmentRepository.useHTTP().find({
      where: key && id ? {
        [key]: { id }
      } : {},
      relations: ['deal', 'campaign'],
    })
      .then((models) => {
        return this.mapper.mapArray(models, AttachmentVM, Attachment);
      })
  };
  public readonly removeMany = async (body: AttachmentVM[]): Promise<AttachmentVM[]> => {
    return await this.attachmentRepository.useHTTP()
    .remove(body.map((e) => ({id: e.id})) as any)
      .then(async () => {
      for (let i = 0; i < body.length; i++) {
        const model = body[i];
        await this.saveLog({
          description: 'Remove an attachment ' + model.name,
          deal: model.deal ? { id: model.deal.id } : undefined,
          campaign: model.campaign ? { id: model.campaign.id } : undefined,
        });
        this.socketService.with('attachments', model, 'remove');
      }
      return body;
    })
  };
  public readonly insert = async (body: any, files: File[]): Promise<AttachmentVM[]> => {
    const deal = body.deal ? { id: body.deal[0] } : undefined;
    const campaign = body.campaign ? { id: body.campaign[0] } : undefined;
    const attachments: AttachmentCM[] = [];
    for (let i = 0; i < files.length / 2; i++) {
      const file = files[i];
      const time = new Date().getTime();
      await this.firebaseService.useUploadFile(
        "attachments/" + (deal ? deal.id : campaign.id) + '/' + time + (file as any).originalname, file);
      attachments.push({
        deal: deal as any,
        campaign: campaign as any,
        name: time + (file as any).originalname,
        extension: (file as any).mimetype,
        url: environment.firebase.linkDownloadFile + "attachments/" + (deal ? deal.id : campaign.id) + '/' + time + (file as any).originalname,
        size: (file as any).size,
        description: ''
      });
    }
    return await this.attachmentRepository.useHTTP()
      .save(attachments as any)
      .then(async (models: Attachment[]) => {
        this.saveLog({
          description: 'Insert multiple attachment',
          deal: deal ? { id: deal.id } : undefined,
          campaign: campaign ? { id: campaign.id } : undefined,
        });
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
        this.saveLog({
          description: 'Update an attachment ' + model.name,
          deal: rs.deal ? { id: rs.deal.id } : undefined,
          campaign: rs.campaign ? { id: rs.campaign.id } : undefined,
        });
        this.socketService.with('attachments', rs, 'update');
        return rs
      })
  }
  public readonly remove = async (id: string): Promise<any> => {
    return await this.attachmentRepository.useHTTP().findOne({ id: id }, { relations: ['deal'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.attachmentRepository.useHTTP()
          .remove(model)
          .then(() => {
            const rs = this.mapper.map({ ...model, id } as Attachment, AttachmentVM, Attachment);
            this.saveLog({
              description: 'Remove an attachment ' + model.name,
              deal: rs.deal ? { id: rs.deal.id } : undefined,
              campaign: rs.campaign ? { id: rs.campaign.id } : undefined,
            });
            this.socketService.with('attachments', rs, 'remove');
            return rs;
          })
      });
  }
  private readonly saveLog = async (data: { description: string, deal?: { id: string }, campaign?: { id: string } }) => {
    await this.logRepository.useHTTP().save(data as any).then(async (res) => {
      this.socketService.with('logs', await this.logRepository.useHTTP().findOne({ id: res.id }, { relations: ['deal'] }), 'create');
    });
  }
}