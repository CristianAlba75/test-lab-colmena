import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalOrderMedicationEntity } from './medical-order-medication.entity';
import { MedicalOrderMedicationDbService } from './medical-order-medication.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalOrderMedicationEntity])],
  exports: [MedicalOrderMedicationDbService],
  providers: [MedicalOrderMedicationDbService],
})
export class MedicalOrderMedicationDbModule {}
