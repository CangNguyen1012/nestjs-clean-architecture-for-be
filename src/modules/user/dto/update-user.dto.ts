import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsOptional()
  @IsString()
  password?: string;
}
