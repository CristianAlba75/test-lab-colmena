import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UserService } from '../user/user.service';
import { DoctorController } from './doctor.controller';
import { UserDbModule } from '../../db/user/user-module';
import { DoctorDbModule } from '../../db/doctor/doctor.module';

@Module({
  imports: [DoctorDbModule, UserDbModule],
  controllers: [DoctorController],
  providers: [DoctorService, UserService],
  exports: [DoctorService],
})
export class DoctorModule {}
