import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { ProductResponse } from 'src/products/dto/responses/product.response';
import { Room } from 'src/room/schemas/room.schema';
import { BaseUserResponse } from 'src/user/dto/response/base-user-response.dto';
import { RoomDto } from '../room.dto';

export class RoomResponse extends RoomDto {
  @Expose()
  @ApiProperty({ type: BaseUserResponse, isArray: true })
  @Type(() => BaseUserResponse)
  users: BaseUserResponse[];

  @Expose()
  @ApiProperty({ type: ProductResponse, isArray: true })
  @Type(() => ProductResponse)
  productsUser: ProductResponse[];

  static mapFrom(room: Room): RoomResponse {
    room.id = room?._id || room.id;
    return plainToClass(RoomResponse, room, {
      excludeExtraneousValues: true,
    });
  }

  static mapFromMulti(rooms: Room[]): RoomResponse[] {
    return rooms.map(RoomResponse.mapFrom);
  }
}
