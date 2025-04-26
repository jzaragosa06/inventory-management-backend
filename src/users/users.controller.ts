// src/user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from 'src/shared/enum/role.enum';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @SetMetadata('roles', [UserRole.ADMIN])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
