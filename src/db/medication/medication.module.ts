import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationEntity } from './medication.entity';
import { MedicationDbService } from './medication.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationEntity])],
  exports: [MedicationDbService],
  providers: [MedicationDbService],
})
export class MedicationDbModule {}
