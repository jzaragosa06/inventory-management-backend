import { UserRole } from 'src/shared/enum/role.enum';

export class CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
}
