import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,private  jwtService : JwtService){}

    async signIn(username: string, pass: string): Promise<{access_token:string}>{
        const user = await this.userService.findOne(username);
        if(user?.password !== pass){
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, username:user.phoneNumber};
        //ToDo: generate a JWT and return it here instead of user object
        return {
            access_token : await this.jwtService.signAsync(payload)
        };
    }

    async register(createUserDto: CreateUserDto){
        const user = await this.userService.create(createUserDto);
        const payload = {sub: user.id, username:user.phoneNumber};
        return {
            access_token : await this.jwtService.signAsync(payload)
        }

    }

    async profile(phoneNumber:string){
        return this.userService.findOne(phoneNumber);
    }

    async updateProfile(phoneNumber:string, updateUserDto: UpdateUserDto){
        return this.userService.update(phoneNumber, updateUserDto);
    }

}