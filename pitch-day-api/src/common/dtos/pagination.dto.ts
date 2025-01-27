import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { TransformInt } from './transformers/number.transformer';
import { TransformObject } from './transformers/object.transformer';

export class PaginationDto<WHERE, SELECT, ORDERBY> {
  @ApiProperty({
    description:
      'The number of items to skip before starting to collect the result set.',
    required: false,
    type: Number,
    example: 1,
  })
  @IsOptional()
  @TransformInt()
  skip: number;

  @ApiProperty({
    description: 'The number of items to return.',
    required: false,
    type: Number,
    example: 10,
  })
  @IsOptional()
  @TransformInt()
  take: number;

  @ApiProperty({
    description: 'The Mongoose Manager `select`.',
    required: false,
    type: Object,
    example: { id: true, name: true },
  })
  @IsOptional()
  @TransformObject()
  select: SELECT;

  @ApiProperty({
    description: 'The Mongoose Manager `where`.',
    required: false,
    type: Object,
    example: { name: { $regex: 'John', $options: 'i' } },
  })
  @IsOptional()
  @TransformObject()
  where: WHERE;

  @ApiProperty({
    description: 'The Mongoose Manager `orderBy`.',
    required: false,
    type: Object,
    example: { name: 1 },
  })
  @IsOptional()
  @TransformObject()
  sort: ORDERBY;

  @ApiProperty({
    description: 'Ignore pagination and return all items.',
    required: false,
    type: Boolean,
    example: false,
  })
  @IsOptional()
  all: boolean | string;
}

export class SimplePaginationDto {
  @ApiProperty({
    description:
      'The number of items to skip before starting to collect the result set.',
    required: false,
    type: Number,
    example: 1,
  })
  @IsOptional()
  @TransformInt()
  skip: number;

  @ApiProperty({
    description: 'The number of items to return.',
    required: false,
    type: Number,
    example: 10,
  })
  @IsOptional()
  @TransformInt()
  take: number;
}
