import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Company } from 'src/schemas/company.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'name',
    });
  }
  async validate(name: string, password: string): Promise<Company> {
    return await this.authService.getAuthenticatedUser(name, password);
  }
}
