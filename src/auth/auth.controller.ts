import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth-service';
import { AuthRequestDto } from './dto/request/auth-request.dto.';
import { AuthLogResponse } from './dto/response/auth-login.dto';
import { AuthRegResponse } from './dto/response/auth-registr.response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @ApiResponse({ type: AuthRegResponse })
  async registeration(
    @Body() reqDto: AuthRequestDto,
  ): Promise<AuthRegResponse> {
    const data = await this.authService.register(reqDto);
    return AuthRegResponse.mapFrom(data);
  }

  @Post('login')
  @ApiResponse({ type: AuthLogResponse })
  async login(@Body() login: AuthRequestDto): Promise<AuthLogResponse> {
    const data = await this.authService.login(login);
    return AuthLogResponse.mapFrom(data);
  }
}
