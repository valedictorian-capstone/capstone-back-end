import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CommentService } from '@services';
import { CommentCM } from '@view-models';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public readonly server: Server;

  protected readonly logger = new Logger('AppGateway');
  constructor(
    protected readonly commentService: CommentService,
  ) { }
  handleDisconnect(client: Socket) {
    client.emit('connection', 'Disconnect');
    this.logger.log('Client disconnected');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log(...args);
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');
  }
  @SubscribeMessage('comments')
  async handleEvent(
    @MessageBody() comment: CommentCM,
    @ConnectedSocket() client: Socket,
  ) {
    const data = await this.commentService.insert(comment);
    this.server.emit('comments', data);
  }
}