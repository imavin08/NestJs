import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequestDto } from 'src/auth/dto/request/auth-request.dto.';
import { User } from 'src/auth/schemas/user.schema';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ type: [UserResponseDto] })
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Delete(':id')
  @ApiResponse({ type: UserDto })
  delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Patch(':id')
  @ApiResponse({ type: UserDto })
  update(
    @Param('id') id: string,
    @Body() updateUser: AuthRequestDto,
  ): Promise<User> {
    return this.userService.update(id, updateUser);
  }
}
