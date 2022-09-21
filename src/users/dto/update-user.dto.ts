import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { Role } from '../enums/role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @ValidateIf((value) => value.email !== undefined && value.email !== null)
  @IsEmail()
  email: string;

  @ValidateIf(
    (value) => value.fullname !== undefined && value.fullname !== null,
  )
  @IsString()
  fullname: string;
  @IsString()
  @ValidateIf((value) => value.role !== undefined && value.role !== null)
  role?: Role;
}
