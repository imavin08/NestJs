import { Injectable,UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import * as dotenv from 'dotenv'
import { Model } from 'mongoose';
import * as jsonwebtoken from "jsonwebtoken"
dotenv.config()
import { LoginUserDto } from "./dto/login-auth.dto";
import { RegisterUserDto } from "./dto/register-auth.dto";
import { User,UserDocument } from "./schemas/user.schema";



@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>) {

    }

    async register(registerDto:RegisterUserDto):Promise<User> {
        const password = await bcrypt.hash(registerDto.password,parseInt(process.env.SALT))
        const newUser = new this.userModel({...registerDto, password})
        return newUser.save()
    }

    async login (loginUserDto:LoginUserDto): Promise<User> {
        const user = await this.userModel.findOne({email:  loginUserDto.email  })
        if(!user) {
            throw new  UnauthorizedException('Wrong email')
        }
        if (!await bcrypt.compare(loginUserDto.password, user.password)) {
            throw new  UnauthorizedException('Wrong password')
        } 
        const token = jsonwebtoken.sign({
            _id: user.id,
            email:user.email
        },
        process.env.JWT_SECRET
        )
        return this.userModel.findByIdAndUpdate(user.id, {token})
    }
}