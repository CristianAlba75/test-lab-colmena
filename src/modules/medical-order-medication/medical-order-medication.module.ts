import { Module } from '@nestjs/common';
import { MedicationService } from '../medication/medication.service';
import { MedicationDbModule } from '../../db/medication/medication.module';
import { MedicalOrderService } from '../medical-order/medical-order.service';
import { MedicalOrderDbModule } from '../../db/medical-order/medical-order.module';
import { MedicalOrderMedicationService } from './medical-order-medication.service';
import { MedicalOrderMedicationController } from './medical-order-medication.controller';
import { MedicalAppointmentModule } from '../medical-appointment/medical-appointment.module';
import { MedicalOrderMedicationDbModule } from '../../db/medical-order-medication/medical-order-medication.module';

@Module({
  imports: [
    MedicalOrderMedicationDbModule,
    MedicalOrderDbModule,
    MedicationDbModule,
    MedicalAppointmentModule,
  ],
  controllers: [MedicalOrderMedicationController],
  providers: [
    MedicalOrderMedicationService,
    MedicalOrderService,
    MedicationService,
  ],
  exports: [MedicalOrderMedicationService],
})
export class MedicalOrderMedicationModule {}
