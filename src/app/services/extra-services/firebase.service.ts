import { inject } from '@extras/functions';
import { Inject } from '@nestjs/common';
import { FIREBASE_NOTIFICATION_SERVICE, FIREBASE_SERVICE } from '@types';
import * as admin from 'firebase-admin';

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
  ) { }

  public static readonly inject = inject(FIREBASE_SERVICE, FirebaseService);

  public readonly sendNotification = (message: IMessage): Promise<string> => {
    return this.notificationService.send(message);;
  }
}
