import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect, WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public readonly server: Server;

  protected readonly logger = new Logger('AppGateway');
  handleDisconnect(client: Socket) {
    client.emit('connection', 'Disconnect');
    this.logger.log('Client disconnected');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log(...args);
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');
  }
}