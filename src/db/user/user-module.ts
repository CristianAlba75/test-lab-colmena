import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDbService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserDbService],
  exports: [UserDbService],
})
export class UserDbModule {}
