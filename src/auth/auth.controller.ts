import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth-service';
import { AuthRequestDto } from './dto/request/auth-request.dto.';
import { AuthLogResponseDto } from './dto/response/auth-login.dto';
import { AuthRegResponseDto } from './dto/response/auth-registr.response.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @ApiResponse({ type: AuthRegResponseDto })
  async registeration(@Body() reqDto: AuthRequestDto): Promise<User> {
    return this.authService.register(reqDto);
  }

  @Post('login')
  @ApiResponse({ type: AuthLogResponseDto })
  async login(@Body() login: AuthRequestDto): Promise<User> {
    return this.authService.login(login);
  }
}
