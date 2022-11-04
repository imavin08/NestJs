import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';
import { RoomRepository } from 'src/repository/repositories/room.rep';
import { UserRepository } from 'src/repository/repositories/user.rep';
import { Room } from 'src/room/schemas/room.schema';
import { UserRequest } from './dto/request/user-request.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRep: UserRepository,
    private readonly roomRep: RoomRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRep.getAll();
  }

  async findById(id: string): Promise<User> {
    return this.userRep.findById(id);
  }

  async delete(id: string): Promise<User> {
    return this.userRep.remove(id);
  }

  async update(id: string, dto: UserRequest): Promise<User> {
    return this.userRep.update(id, dto);
  }

  async joinFriend(id: string, userId: string): Promise<User> {
    const feauterFriend = await this.userRep.findById(id);
    const user = await this.userRep.findById(userId);
    const feauterFriendId = feauterFriend._id.toString();
    user.friends.forEach((myFriend) => {
      if (myFriend._id.toString() === feauterFriendId) {
        throw new BadRequestException('User is already your friend');
      }
    });
    if (userId === feauterFriendId) {
      throw new BadRequestException('You can not add yourself');
    }
    user.friends.push(feauterFriend);
    feauterFriend.friends.push(user);
    await feauterFriend.save();
    await user.save();
    return user;
  }

  async deleteFriend(id: string, userId: string): Promise<User> {
    const user = await this.userRep.findById(userId);
    const friend = await this.userRep.findById(id);
    user.friends.splice(user.friends.indexOf(id), 1);
    user.save();
    friend.friends.splice(friend.friends.indexOf(userId), 1);
    friend.save();
    return user;
  }

  async joinToRoom(userId: string, roomId: string): Promise<Room> {
    const room = await this.roomRep.findRoomById(roomId);
    if (!room) {
      throw new NotFoundException('room does not exist');
    }
    const user = await this.userRep.findById(userId);
    const usersInside = room.users.map((user) => user._id.toString());
    if (usersInside.includes(user._id.toString())) {
      throw new BadRequestException('User is alredy inside room');
    }
    room.users.push(user);
    room.productsUser.push(...user.products);

    return room.save();
  }

  async leaveRoom(id: string, roomId: string): Promise<Room> {
    const room = await this.roomRep.findRoomById(roomId);
    const user = await this.userRep.findById(id);
    room.users.splice(room.users.indexOf(id), 1);
    const indexFirstProd = room.productsUser.indexOf(
      user.products[0]._id.toString(),
    );
    room.productsUser.splice(indexFirstProd, user.products.length);
    return room.save();
  }
}
