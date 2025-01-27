import { PaginationDto } from 'src/common/dtos/pagination.dto';

export function getPaginationOptions<WHERE, SELECT, ORDERBY>({
  skip,
  take,
  where,
  select,
  sort,
  all,
}: PaginationDto<WHERE, SELECT, ORDERBY>) {
  const takeLimit = 100;
  return {
    skip,
    take: all ? undefined : take <= takeLimit ? take : takeLimit,
    where: { ...where, deletedAt: null },
    select: select,
    sort,
  };
}
