import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { AuthService } from './auth-service';
import { AuthController } from './auth.controller';

const providers = [AuthService];
@Module({
  imports: [RepositoryModule],
  controllers: [AuthController],
  providers,
  exports: [...providers],
})
export class AuthModule {}
