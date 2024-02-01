import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

    async signIn(username: string, pass: string){
        const user = await (await this.userService.findOne(username));
        if(user?.password !== pass){
            throw new UnauthorizedException();
        }
        const {password, ...result} = user;
        //ToDo: generate a JWT and return it here instead of user object
        return result;
    }
}
