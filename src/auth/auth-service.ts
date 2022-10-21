import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from './schemas/user.schema';
import { AuthRepository } from 'src/repository/repositories/auth.rep';
import { AuthRequestDto } from './dto/request/auth-request.dto.';

@Injectable()
export class AuthService {
  constructor(private readonly authRep: AuthRepository) {}

  async register(reqDto: AuthRequestDto): Promise<User> {
    const password = await bcrypt.hash(
      reqDto.password,
      parseInt(process.env.SALT),
    );
    return this.authRep.create(reqDto, password);
  }

  async login(loginUserDto: AuthRequestDto): Promise<User> {
    const user = await this.authRep.find(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Wrong email');
    }

    const validPassword = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException('Wrong password');
    }
    const token = jsonwebtoken.sign(
      {
        _id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
    return this.authRep.update(user.id, token);
  }
}
