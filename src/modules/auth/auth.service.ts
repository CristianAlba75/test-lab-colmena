import { JwtService } from '@nestjs/jwt';
import { ILoginResponse } from './auth.interface';
import { UserService } from '../user/user.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string): Promise<ILoginResponse> {
    this.logger.log(`Login user with email: ${email}`);
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      this.logger.error(`Invalid credentials for user with email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.userId, email: user.email, role: user.role };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }
}
