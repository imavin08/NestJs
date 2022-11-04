import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { UserRequest } from 'src/user/dto/request/user-request.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().populate([
      { model: 'Product', path: 'products' },
      {
        model: 'User',
        path: 'friends',
        populate: {
          model: 'Product',
          path: 'products',
        },
      },
    ]);
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).populate([
      { model: 'Product', path: 'products' },
      {
        model: 'User',
        path: 'friends',
        populate: {
          model: 'Product',
          path: 'products',
        },
      },
    ]);
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async update(id: string, dto: UserRequest): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true });
  }
}
