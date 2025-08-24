import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalAppointmentEntity } from './medical-appointment.entity';
import { MedicalAppointmentDbService } from './medical-appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalAppointmentEntity])],
  exports: [MedicalAppointmentDbService],
  providers: [MedicalAppointmentDbService],
})
export class MedicalAppointmentDbModule {}
