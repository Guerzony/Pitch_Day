import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  education: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  goal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  skills: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  linkedinLink?: string;
}
