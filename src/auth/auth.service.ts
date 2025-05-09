import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await user.comparePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    console.log('user data', user);
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);
    console.log('user access token', access_token);

    return {
      access_token: access_token,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
