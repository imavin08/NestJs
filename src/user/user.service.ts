import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from 'src/auth/dto/request/auth-request.dto.';
import { User } from 'src/auth/schemas/user.schema';
import { UserRepository } from 'src/repository/repositories/user.rep';

@Injectable()
export class UserService {
  constructor(private readonly userRep: UserRepository) {}

  async getAll(): Promise<User[]> {
    return this.userRep.getAll();
  }

  async findById(id: string): Promise<User> {
    return this.userRep.findById(id);
  }

  async delete(id: string): Promise<User> {
    return this.userRep.remove(id);
  }

  async update(id: string, dto: AuthRequestDto): Promise<User> {
    return this.userRep.update(id, dto);
  }
}
