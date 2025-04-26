import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/shared/enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'qwerty123!@#',
    description: 'password of user',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'role of user (i.e, admin, auditor, user)',
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}