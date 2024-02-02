import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGaurd } from './auth.gaurd';
import { IsPhoneNumber } from 'class-validator';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto.phoneNumber, signInDto.password);
    }
    
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        return this.authService.register(createUserDto);
    }

    @UseGuards(AuthGaurd)
    @Get("profile")
    getProfile(@Request() req){
        const phoneNumber = req.user.username;
        return this.authService.profile(phoneNumber);
    }

    @UseGuards(AuthGaurd)
    @Patch("profile/edit")
    editProfile(@Request() req, @Body() updateUserDto : UpdateUserDto){
        const phoneNumber = req.user.username;
        return this.authService.updateProfile(phoneNumber, updateUserDto);
    }
}
