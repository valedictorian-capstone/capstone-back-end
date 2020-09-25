import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway(4001, { transport: ['websocket'] })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public readonly wss;

  protected readonly logger = new Logger('AppGateway');

  handleDisconnect(client: any) {
    this.logger.log('Client disconnected');
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');
  }
}