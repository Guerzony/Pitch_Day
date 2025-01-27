import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'Inatel',
    description: 'Company Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '123456',
    description: 'Company Password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
