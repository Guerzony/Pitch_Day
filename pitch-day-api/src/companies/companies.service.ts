import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Model } from 'mongoose';
import { Company } from 'src/schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword } from 'src/utils/password';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongodb';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
    private readonly configService: ConfigService,
  ) {}

  async create(company: CreateCompanyDto) {
    const companyToSave = {
      ...company,
      _id: new ObjectId(),
      password: await hashPassword(
        this.configService.get<string>('DEFAULT_PASSWORD'),
      ),
    };

    return await this.companyModel.create(companyToSave);
  }

  async findAll() {
    return await this.companyModel.find();
  }

  async findOne(id: string) {
    return await this.companyModel.findOne({ _id: new ObjectId(id) });
  }

  async findOneByName(name: string) {
    return await this.companyModel.findOne({ name });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updateCompanyDto,
      { new: true },
    );
  }

  async remove(id: string) {
    const comapany = await this.findOne(id);

    if (!comapany) {
      throw new NotFoundException('Company not found');
    }

    return await this.companyModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { deletedAt: new Date() },
      { new: true },
    );
  }
}
