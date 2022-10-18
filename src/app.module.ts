import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ProductsModule,
    AuthModule,
    MongooseModule.forRoot(`mongodb+srv://imavin08:dimadima1991@cluster0.zyibkqs.mongodb.net/noteBook?retryWrites=true&w=majority`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
