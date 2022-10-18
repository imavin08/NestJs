import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from "./auth-service";
import { AuthController } from "./auth.controller";
import { User, UsersSchema } from "./schemas/user.schema";

@Module({
    providers:[AuthService],
    controllers:[AuthController],
    imports:[MongooseModule.forFeature([{name: User.name,schema:UsersSchema}])]
})

export class AuthModule{}