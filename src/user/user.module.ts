import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { RepositoryModule } from 'src/repository/repository.module';
import { RoomService } from 'src/room/room.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const providers = [UserService, RoomService];

@Module({
  imports: [
    RepositoryModule,
    MulterModule.register({
      storage: './public/avatars',
    }),
  ],
  controllers: [UserController],
  providers,
  exports: [...providers],
})
export class UserModule {}
