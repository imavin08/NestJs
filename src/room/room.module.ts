import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserService } from 'src/user/user.service';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

const providers = [RoomService, UserService];

@Module({
  imports: [RepositoryModule],
  controllers: [RoomController],
  providers,
  exports: [...providers],
})
export class RoomModule {}
