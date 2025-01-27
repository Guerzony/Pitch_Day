import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({ description: 'Company Name' })
  name?: string;

  @ApiProperty({
    example: ['user_id1', 'user_id2'],
    description: 'Company favorites candidates',
  })
  favorites?: string[];
}
