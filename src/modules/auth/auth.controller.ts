import { AuthService } from './auth.service';
import { LoginBasicDto, LoginResponseDto } from './auth.dto';
import { Controller, Post, Body, Logger, HttpCode } from '@nestjs/common';

@Controller('login')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async login(@Body() params: LoginBasicDto): Promise<LoginResponseDto> {
    try {
      this.logger.log(`Starting login user: ${params.email}`);

      const authenticatedUser = await this.authService.login(
        params.email,
        params.password,
      );

      this.logger.log(`User authenticated successfully`);

      return authenticatedUser;
    } catch (error) {
      this.logger.error(`Error login`);
      throw error;
    }
  }
}
