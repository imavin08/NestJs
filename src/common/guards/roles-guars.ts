import * as jsonwebtoken from 'jsonwebtoken';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    if (!headers.authorization) {
      throw new UnauthorizedException('Unauthorized');
    }

    const [type, token] = headers.authorization.split(' ');
    if (type !== 'Bearer' && !token) {
      throw new UnauthorizedException('Unauthorized');
    }
    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    const currentUser = await this.userService.findById(user._id);
    if (!currentUser) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}
