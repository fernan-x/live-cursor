import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger('AppGateway');

  @WebSocketServer()
  private readonly server: Server;

  private connectedUsers: string[] = [];

  @SubscribeMessage('mouse-move')
  handleMessage(client: any, payload: any): void {
    console.log(client.id, payload);
    this.server
      .except(client.id)
      .emit('update-mouse-position', { client_id: client.id, ...payload });
  }

  afterInit(server: Server) {
    this.logger.log('Init socket server');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.connectedUsers = this.connectedUsers.filter(
      (elem: string) => elem !== client.id,
    );
    console.log(this.connectedUsers);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.connectedUsers.push(client.id);
    console.log(this.connectedUsers);
  }
}
