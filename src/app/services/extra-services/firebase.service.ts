/* eslint-disable @typescript-eslint/no-var-requires */
import { inject } from '@extras/functions';
import { GetSignedUrlResponse } from "@google-cloud/storage";
import { Injectable } from '@nestjs/common';
import { FIREBASE_SERVICE } from "@types";
import * as admin from 'firebase-admin';
import { environment } from 'src/environments/environment';
import * as stream from 'stream';
@Injectable()
export class FirebaseService {

  public static readonly inject = inject(FIREBASE_SERVICE, FirebaseService);
  constructor() { 
    console.log(this);
  }
  public static readonly init = async () => {
    console.log(require('service-account.json'));
    await admin.initializeApp({
      credential: admin.credential.cert(require('service-account.json')),
      databaseURL: environment.firebase.databaseURL,
    });
  }
  public readonly useSendToDevice = async (
    registrationToken: string | string[],
    payload: admin.messaging.MessagingPayload,
  ): Promise<admin.messaging.MessagingDevicesResponse> => {
    return admin.messaging().sendToDevice(registrationToken, payload, { priority: "normal", timeToLive: 24 * 24 * 60 });
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
    const bucket = (name: string) => admin.storage().bucket(name);
    return { bucket };
  }
}
