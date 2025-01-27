import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Company } from 'src/schemas/company.schema';
import { PublicResource } from 'src/auth/guards/public-resource';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @PublicResource()
  @Post()
  @ApiOkResponse({ type: Company })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companiesService.create(createCompanyDto);
  }

  @Get()
  async findAll() {
    return await this.companiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companiesService.findOne(id);
  }

  @Get('favorites')
  async findFavorites() {}

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param('id') id: string) {
    return await this.companiesService.remove(id);
  }
}
