import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repository/repositories/user.rep';
import { RepositoryModule } from 'src/repository/repository.module';
import { ChatGateway } from './chat.gateway';

const providers = [ChatGateway, UserRepository];

@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers,
  exports: [...providers],
})
export class GatewayModule {}
