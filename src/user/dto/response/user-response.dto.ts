import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, plainToClass } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { ProductResponse } from 'src/products/dto/responses/product.response';
import { BaseUserResponse } from './base-user-response.dto';

export class UserResponse extends BaseUserResponse {
  @Expose()
  @ApiProperty({ type: BaseUserResponse, isArray: true })
  @Type(() => BaseUserResponse)
  friends: BaseUserResponse[];

  @Expose()
  @ApiProperty({ type: ProductResponse, isArray: true })
  @ValidateNested()
  @Type(() => ProductResponse)
  products: ProductResponse[];

  static mapFrom(user: User): UserResponse {
    user.id = user?._id || user.id;
    if (user.friends) {
      const products = user.friends.flatMap((friend) => friend.products);
      user.products.push(...products);
    }
    return plainToClass(UserResponse, user, {
      excludeExtraneousValues: true,
    });
  }

  static mapFromMulti(users: User[]): UserResponse[] {
    return users.map(UserResponse.mapFrom);
  }
}
