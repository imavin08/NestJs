import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpRequestWithUser } from '../types/http-user.type';
import * as jsonwebtoken from 'jsonwebtoken';
import { UserResponse } from 'src/user/dto/response/user-response.dto';

export const HttpUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: HttpRequestWithUser = ctx.switchToHttp().getRequest();
    const auth = request.headers.authorization;
    const [_, token] = auth.split(' ');
    const currentUser = jsonwebtoken.decode(token, process.env.JWT_SECRET);

    return UserResponse.mapFrom(currentUser);
  },
);
