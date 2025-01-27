import { BadRequestException, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/utils/password';
import { LoginDto } from './dto/login.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/schemas/company.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
  ) {}

  public async login({ name, password }: LoginDto) {
    const comṕany = await this.companiesService.findOneByName(name);

    const isPasswordValid = await comparePassword(password, comṕany.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Wrong password!');
    }

    const { access_token } = await this.createToken(comṕany);

    return { access_token };
  }

  public async getAuthenticatedUser(name: string, plainTextPassword: string) {
    const comṕany = await this.companiesService.findOne(name);

    if (!comṕany) {
      throw new BadRequestException('Company not found');
    }

    await this.verifyPassword(plainTextPassword, comṕany.password);

    comṕany.password = undefined;
    return comṕany;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await comparePassword(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong password provided');
    }
  }

  private async createToken(comapany: Company) {
    const payload = { id: comapany._id, name: comapany.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
