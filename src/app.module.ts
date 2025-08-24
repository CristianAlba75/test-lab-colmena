import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from './modules/doctor/doctor.module';
import { dataSourceOptions } from './config/db/typeorm.config';
import { PatientModule } from './modules/patient/patient.module';
import { MedicationModule } from './modules/medication/medication.module';
import { MedicalOrderModule } from './modules/medical-order/medical-order.module';
import { MedicalAppointmentModule } from './modules/medical-appointment/medical-appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    PatientModule,
    DoctorModule,
    MedicalAppointmentModule,
    MedicalOrderModule,
    MedicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
