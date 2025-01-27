import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUserDto, UserPaginationDTO } from './dto/get-user.dto';
import { getPaginationOptions } from 'src/utils/getPaginationOptions';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() userPaginationDTO: UserPaginationDTO) {
    const paginationOptions = {
      ...getPaginationOptions(userPaginationDTO),
      filter: userPaginationDTO.filter
        ? JSON.parse(userPaginationDTO.filter)
        : undefined,
    };

    return this.usersService.findAll(paginationOptions);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') { id }: GetUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param('id') { id }: GetUserDto) {
    return this.usersService.remove(id);
  }
}
