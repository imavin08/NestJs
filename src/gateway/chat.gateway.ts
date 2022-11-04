import * as jsonwebtoken from 'jsonwebtoken';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserRepository } from '../repository/repositories/user.rep';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userRep: UserRepository) {}

  tokenDecode(client: any) {
    const [_, token] = client.handshake.headers.token.split(' ');
    const currentUser = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    return currentUser;
  }

  handleConnection(client: any, ...args: any[]) {
    const currentUser = this.tokenDecode(client);
    this.userRep.update(currentUser._id, { status: true });
  }

  handleDisconnect(client: any) {
    const currentUser = this.tokenDecode(client);
    this.userRep.update(currentUser._id, { status: false });
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  @SubscribeMessage('joinToRoom')
  handlejoinToRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    const currentUser = this.tokenDecode(client);
    client.join(room);
    this.server.to(room).emit('joinRoom', room);
    this.server
      .to(room)
      .emit('messageToRoom', `${currentUser.email} Join to room`);
  }

  @SubscribeMessage('messageToRoom')
  handleMessageToRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    const currentUser = this.tokenDecode(client);
    const { room, message } = JSON.parse(data);
    this.server
      .to(room)
      .emit('messageToRoom', `${currentUser.email}: ${message}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveToRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    const currentUser = this.tokenDecode(client);
    client.leave(room);
    this.server.to(room).emit('leftRoom', room);
    this.server
      .to(room)
      .emit('messageToRoom', `${currentUser.email} Left room`);
  }
}
