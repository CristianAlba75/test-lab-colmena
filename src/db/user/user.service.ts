import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserDbService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: Partial<UserEntity>): Promise<UserEntity> {
    const passwordHash = await bcrypt.hash(data.passwordHash, 10);
    const user = this.userRepository.create({
      ...data,
      userId: uuidv4(),
      passwordHash,
    });
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    return validPassword ? user : null;
  }
}
