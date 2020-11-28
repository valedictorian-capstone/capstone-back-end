import { Attachment } from "@models";
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AttachmentRepository } from "@repositories";
import { FirebaseService } from "@services";
import { ATTACHMENT_REPOSITORY, FIREBASE_SERVICE } from "@types";
import { AttachmentCM, AttachmentUM, AttachmentVM } from "@view-models";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { environment } from "src/environments/environment";
import { In } from "typeorm";

@Injectable()
export class AttachmentService {

  constructor(
    @Inject(ATTACHMENT_REPOSITORY) protected readonly attachmentRepository: AttachmentRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper
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
        "attachments/" +  deal.id + '/' + time + (file as any).originalname, file);
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
      .then((models) => {
        return this.findAll(models.map((e) => e.id));
      })
  }

  public readonly update = async (body: AttachmentUM): Promise<AttachmentVM> => {
    return await this.attachmentRepository.useHTTP()
      .save(body as any)
      .then((model) => {
        return this.findById(model.id);
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
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  }
}