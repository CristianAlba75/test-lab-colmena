import { IUser } from './user.interfaz';
import { UserDbService } from '../../db/user/user.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private userService: UserDbService) {}

  async create(params: Partial<IUser>): Promise<IUser> {
    this.logger.log(`Verifying if user exist: ${params.email}`);

    const existingUser = await this.userService.findByEmail(params.email);

    if (existingUser) {
      this.logger.error(`User already exist`);
      throw new BadRequestException(
        `User with email ${params.email} already exists`,
      );
    }

    return await this.userService.createUser(params);
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    this.logger.log(`Validating user: ${email}`);

    const validatedUser = await this.userService.validateUser(email, password);

    this.logger.log(`Returning validation`);

    return validatedUser;
  }
}
