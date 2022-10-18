import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth-service';
import { LoginUserDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService) {

    }

    @Post('registration')
    registeration(@Body() register:RegisterUserDto):Promise<User> {
        return this.authService.register(register)
    }

    @Post('login')
    login(@Body() login:LoginUserDto):Promise<User> {
        return this.authService.login(login)
    }
    
}
