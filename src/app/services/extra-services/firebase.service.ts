/* eslint-disable @typescript-eslint/no-var-requires */
import { inject } from '@extras/functions';
import { GetSignedUrlResponse } from "@google-cloud/storage";
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { FIREBASE_NOTIFICATION_SERVICE, FIREBASE_SERVICE, FIREBASE_STORAGE_SERVICE } from '@types';
import * as admin from 'firebase-admin';
import { FileCM } from 'src/app/view-models/extra-view-models/file.view-model';
import { environment } from 'src/environments/environment';
import * as stream from 'stream';
import { FirebaseStorageService } from '@aginix/nestjs-firebase-admin';
interface IMessage {
  data: {
    id: string,
    title: string,
    message: string,
    dataContent?: any
  };
  token: string;
};

export class FirebaseService {
  constructor(
    @Inject(FIREBASE_NOTIFICATION_SERVICE) protected readonly notificationService: admin.messaging.Messaging,
    @Inject(FIREBASE_STORAGE_SERVICE) protected readonly storageService: admin.storage.Storage,
    protected readonly firebaseStorageService: FirebaseStorageService,
  ) { }

  public static readonly inject = inject(FIREBASE_SERVICE, FirebaseService);

  public readonly sendNotification = (message: IMessage): Promise<string> => {
    return this.notificationService.send(message);;
  }

  public readonly uploadFile = (body: FileCM): Promise<string> => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(body.file, 'base64'));
    const bucket = this.storageService.bucket(body.folder);
    const neprocessile = bucket.file(body.fileName);
    bufferStream.pipe(neprocessile.createWriteStream({
      metadata: {
        contentType: body.fileType,
      },
      public: true,
      validation: 'md5'
    })).on('finish', () => {
      bucket.file(body.fileName)
        .getSignedUrl({ action: 'read', expires: '02-02-2021' },
          (err: any, resp: string) => {
            if (err !== undefined) {
              throw new InternalServerErrorException();
            }
            return resp;
          }
        )
    })
    return;
  }


  public static readonly init = async () => {
    console.log(require('service-account.json'));
    await admin.initializeApp({
      credential: admin.credential.cert(require('service-account.json')),
      databaseURL: environment.firebase.databaseURL,
    });
  }
  public readonly useUploadFileBase64 = async (path: string, data: string, type: string): Promise<any> => {
    const buffer = new stream.PassThrough();
    buffer.end(Buffer.from(data.split(",")[1], "base64"));
    const file = this.useGetStorage().bucket(environment.firebase.bucketUrl).file(path);
    buffer.pipe(file.createWriteStream({
      metadata: {
        contentType: type,
      },
    })).on("finish", () => {
      return "";
    });
  }
  public readonly useDeleteFile = async (path: string): Promise<any[]> => {
    const file = this.useGetStorage().bucket(environment.firebase.bucketUrl).file(path);
    return file.delete();
  }
  public readonly useGetFile = async (path: string): Promise<GetSignedUrlResponse> => {
    const file = this.useGetStorage().bucket(environment.firebase.bucketUrl).file(path);
    return file.getSignedUrl({
      action: "read",
      expires: "3000-10-10",
    });
  }
  private readonly useGetStorage = () => {
    const bucket = (name: string) => this.firebaseStorageService.bucket(name);
    return { bucket };
  }
}
