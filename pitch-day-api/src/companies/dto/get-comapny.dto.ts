import { Validate } from 'class-validator';
import { IsValidId } from 'src/utils/validate-id';

export class GetCompanyDto {
  @Validate(IsValidId)
  id: string;
}
