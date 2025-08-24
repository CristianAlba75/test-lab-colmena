import { Module } from '@nestjs/common';
import { MedicalOrderService } from './medical-order.service';
import { MedicalOrderController } from './medical-order.controller';
import { MedicalOrderDbModule } from '../../db/medical-order/medical-order.module';
import { MedicalAppointmentService } from '../medical-appointment/medical-appointment.service';
import { MedicalAppointmentDbModule } from '../../db/medical-appointment/medical-appointment.module';

@Module({
  imports: [MedicalOrderDbModule, MedicalAppointmentDbModule],
  controllers: [MedicalOrderController],
  providers: [MedicalOrderService, MedicalAppointmentService],
  exports: [MedicalOrderService],
})
export class MedicalOrderModule {}
