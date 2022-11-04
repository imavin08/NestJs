import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/schemas/user.schema';
import { HttpUser } from 'src/common/decorators/http-user.decorator';
import { RolesGuard } from 'src/common/guards/roles-guars';
import { RoomResponse } from 'src/room/dto/response/room-responce.dto';
import { UserRequest } from './dto/request/user-request.dto';
import { UserResponse } from './dto/response/user-response.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ type: [UserResponse] })
  async getAll(): Promise<UserResponse[]> {
    const data = await this.userService.getAll();
    return UserResponse.mapFromMulti(data);
  }

  @Get(':id')
  @ApiResponse({ type: UserResponse })
  async getById(@Param('id') id: string): Promise<UserResponse> {
    const data = await this.userService.findById(id);
    return UserResponse.mapFrom(data);
  }

  @Delete(':id')
  @ApiResponse({ type: UserResponse })
  async delete(@Param('id') id: string): Promise<UserResponse> {
    const data = await this.userService.delete(id);
    return UserResponse.mapFrom(data);
  }

  @Patch(':id')
  @ApiResponse({ type: UserResponse })
  async update(
    @Param('id') id: string,
    @Body() updateUser: UserRequest,
  ): Promise<UserResponse> {
    const data = await this.userService.update(id, updateUser);
    return UserResponse.mapFrom(data);
  }

  // ======================================

  // @Patch('user/:id')
  // @UseInterceptors(FileInterceptor('file'))
  // async test(@UploadedFile() file: Express.Multer.File) {
  //   const mountainsRef = ref(storage, 'mountains.jpg');
  // }

  @Patch('friend/:id')
  @ApiResponse({ type: UserResponse })
  async joinFriend(
    @Param('id') id: string,
    @HttpUser() user: User,
  ): Promise<UserResponse> {
    return this.userService.joinFriend(id, user.id).then(UserResponse.mapFrom);
  }

  @Delete('friend/:id')
  @ApiResponse({ type: UserResponse })
  async deleteFriend(
    @Param('id') id: string,
    @HttpUser() user: User,
  ): Promise<UserResponse> {
    return this.userService
      .deleteFriend(id, user.id)
      .then(UserResponse.mapFrom);
  }

  @Post('room/:id')
  @ApiResponse({ type: RoomResponse })
  async joinToRoom(
    @HttpUser() user: User,
    @Param('id') roomId: string,
  ): Promise<RoomResponse> {
    return this.userService
      .joinToRoom(user.id, roomId)
      .then(RoomResponse.mapFrom);
  }

  @Delete('room/:id')
  @ApiResponse({ type: RoomResponse })
  async leaveRoom(
    @HttpUser() user: User,
    @Param('id') roomId: string,
  ): Promise<RoomResponse> {
    return this.userService
      .leaveRoom(user.id, roomId)
      .then(RoomResponse.mapFrom);
  }
}
