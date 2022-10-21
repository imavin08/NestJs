import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const providers = [UserService];

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers,
  exports: [...providers],
})
export class UserModule {}
