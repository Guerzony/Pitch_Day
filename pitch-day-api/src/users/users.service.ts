import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { convertImage } from 'src/utils/convert-pfp';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(user: CreateUserDto) {
    if (user?.profilePicture) {
      user.profilePicture = await convertImage(user.profilePicture);
    }
    return await this.userModel.create({ ...user, _id: new ObjectId() });
  }

  async findAll({ skip, take, select, where, sort, filter }) {
    const entities = await this.userModel
      .find(filter)
      .where(where)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(take)
      .exec();

    const totalCount = await this.userModel.countDocuments(filter);

    return { data: entities, totalCount };
  }

  async findOne(id: string) {
    console.log(id);
    console.log('Aaaaaaaaaaaaaa');
    return await this.userModel.findOne({ _id: new ObjectId(id) });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return await this.userModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateUserDto,
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    const userExists = await this.findOne(id);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return await this.userModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { deletedAt: new Date() },
      {
        new: true,
      },
    );
  }
}
