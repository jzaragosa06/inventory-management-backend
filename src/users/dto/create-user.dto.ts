import { UserRole } from 'src/shared/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'email of the user',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'qwerty123!@#',
    description: 'password of user',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'role of user (i.e, admin, auditor, user)',
    required: true,
  })
  role: UserRole;
}
