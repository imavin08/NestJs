import { Injectable } from '@nestjs/common';
import { RoomRepository } from 'src/repository/repositories/room.rep';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(private readonly roomRep: RoomRepository) {}

  async getAllRooms(): Promise<Room[]> {
    return this.roomRep.getAll();
  }

  async createRoom(): Promise<Room> {
    return this.roomRep.createRoom();
  }

  async findRoom(roomId: string): Promise<Room> {
    return this.roomRep.findRoomById(roomId);
  }

  async deleteRoom(roomId: string): Promise<Room> {
    return this.roomRep.deleteRoom(roomId);
  }
}
