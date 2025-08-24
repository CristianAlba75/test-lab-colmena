import { Module } from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { MedicalAppointmentController } from './medical-appointment.controller';
import { MedicalAppointmentDbModule } from '../../db/medical-appointment/medical-appointment.module';

@Module({
  imports: [MedicalAppointmentDbModule],
  controllers: [MedicalAppointmentController],
  providers: [MedicalAppointmentService],
  exports: [MedicalAppointmentService],
})
export class MedicalAppointmentModule {}
