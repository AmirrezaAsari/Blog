import { IsNotEmpty, MinLength } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    phoneNumber : string;
    @IsNotEmpty()
    @MinLength(3)
    password : string;
}