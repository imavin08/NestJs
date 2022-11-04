import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { ChatGateway } from './gateway/chat.gateway';
import { UserRepository } from './repository/repositories/user.rep';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    RoomModule,
    UserModule,
    ProductsModule,
    AuthModule,
    MongooseModule.forRoot(
      `mongodb+srv://imavin08:dimadima1991@cluster0.zyibkqs.mongodb.net/noteBook?retryWrites=true&w=majority`,
    ),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
