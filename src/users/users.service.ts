import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService){}
  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({data : createUserDto});
  }

  findAll() {
    return this.prismaService.user.findMany({});
  }

  findOne(phoneNumber: string) { //searchs based on user's phone number, it's unique
    return this.prismaService.user.findUnique({where : {phoneNumber}}) ;
  }

  update(phoneNumber: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({data : updateUserDto, where : {phoneNumber}});
  }

  remove(id: string) {
    return this.prismaService.user.delete({where : {id}});
  }
}
