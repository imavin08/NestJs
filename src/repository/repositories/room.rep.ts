import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/room/schemas/room.schema';

@Injectable()
export class RoomRepository {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async getAll(): Promise<Room[]> {
    return this.roomModel.find();
  }

  async createRoom(): Promise<Room> {
    const newRoom = new this.roomModel();
    return newRoom.save();
  }

  async findRoomById(id: string): Promise<Room> {
    return this.roomModel.findById(id).populate({
      model: 'User',
      path: 'users',
    });
  }

  async deleteRoom(roomId: string): Promise<Room> {
    return this.roomModel.findByIdAndDelete(roomId);
  }
}
