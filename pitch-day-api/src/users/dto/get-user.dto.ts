import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
// import { IsValidId } from 'src/utils/validate-id';

export class GetUserDto {
  // @Validate(IsValidId)
  id: string;
}

export class UserPaginationDTO extends PaginationDto<
  Record<string, any>,
  Record<string, any>,
  Record<string, any>
> {
  @ApiProperty({
    description: 'The Mongoose `Filter`.',
    required: false,
    type: String,
    // eslint-disable-next-line prettier/prettier
    example: { type: 'GATEWAY' },
  })
  @IsOptional()
  filter: string;
}
