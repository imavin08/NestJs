import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles-guars';
import { RoomResponse } from './dto/response/room-responce.dto';
import { RoomService } from './room.service';

@ApiBearerAuth()
@ApiTags('room')
@Controller('room')
@UseGuards(RolesGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiResponse({ type: RoomResponse })
  async getAllRooms(): Promise<RoomResponse[]> {
    return this.roomService.getAllRooms().then(RoomResponse.mapFromMulti);
  }

  @Post()
  @ApiResponse({ type: RoomResponse })
  async createRoom(): Promise<RoomResponse> {
    return this.roomService.createRoom().then(RoomResponse.mapFrom);
  }

  @Get(':id')
  @ApiResponse({ type: RoomResponse })
  async findRoom(@Param('id') roomId: string): Promise<RoomResponse> {
    return this.roomService.findRoom(roomId).then(RoomResponse.mapFrom);
  }

  @Delete(':id')
  @ApiResponse({ type: RoomResponse })
  async deleteRoom(@Param('id') roomId: string): Promise<RoomResponse> {
    return this.roomService.deleteRoom(roomId).then(RoomResponse.mapFrom);
  }
}
