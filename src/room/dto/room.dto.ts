import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RoomDto {
  @Expose()
  @ApiProperty()
  id: string;
}
