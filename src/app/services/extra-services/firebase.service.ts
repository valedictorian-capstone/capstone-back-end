import { inject } from '@extras/functions';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FIREBASE_NOTIFICATION_SERVICE, FIREBASE_SERVICE, FIREBASE_STORAGE_SERVICE } from '@types';
import * as admin from 'firebase-admin';
import { FileCM } from 'src/app/view-models/extra-view-models/file.view-model';
import * as stream from 'stream';

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
  ) { }

  public static readonly inject = inject(FIREBASE_SERVICE, FirebaseService);

  public readonly sendNotification = (message: IMessage): Promise<string> => {
    return this.notificationService.send(message);;
  }

  public readonly uploadFile = (body: FileCM): Promise<string> => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(body.file, 'base64'));
    const bucket = this.storageService.bucket(body.folder);
    const newFile = bucket.file(body.fileName);
    bufferStream.pipe(newFile.createWriteStream({
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
}
