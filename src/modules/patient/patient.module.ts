import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { UserService } from '../user/user.service';
import { PatientController } from './patient.controller';
import { UserDbModule } from '../../db/user/user-module';
import { PatientDbModule } from '../../db/patient/patient.module';

@Module({
  imports: [PatientDbModule, UserDbModule],
  controllers: [PatientController],
  providers: [PatientService, UserService],
  exports: [PatientService],
})
export class PatientModule {}
