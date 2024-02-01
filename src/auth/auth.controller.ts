import { Body, Controller, HttpCode, HttpStatus, Post, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto.phoneNumber, signInDto.password);
    }
    
    // @Post('register')
    // async register(@Body createUserDto: CreateUserDto){
    //     return this.authService.register()
    // }
}
