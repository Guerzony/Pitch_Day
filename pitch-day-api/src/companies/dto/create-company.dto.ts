import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Inatel', description: 'Company Name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
