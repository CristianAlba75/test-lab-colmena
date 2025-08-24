import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { MedicationDbModule } from '../../db/medication/medication.module';

@Module({
  imports: [MedicationDbModule],
  controllers: [MedicationController],
  providers: [MedicationService],
  exports: [MedicationService],
})
export class MedicationModule {}
