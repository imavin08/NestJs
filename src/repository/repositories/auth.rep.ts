import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRequestDto } from 'src/auth/dto/request/auth-request.dto.';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(reqDto: AuthRequestDto, password: string): Promise<User> {
    const dublicateEmail = await this.userModel.findOne({
      email: reqDto.email,
    });
    if (dublicateEmail) {
      throw new BadRequestException('Email in use');
    }
    const newUser = new this.userModel({ ...reqDto, password });
    return newUser.save();
  }

  async find(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async update(id: string, token: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { token }, { new: true });
  }
}
