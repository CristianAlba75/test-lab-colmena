import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './patient.entity';
import { PatientDbService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  exports: [PatientDbService],
  providers: [PatientDbService],
})
export class PatientDbModule {}
