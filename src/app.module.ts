import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { dataSourceOptions } from './config/db/typeorm.config';
import { PatientModule } from './modules/patient/patient.module';
import { MedicationModule } from './modules/medication/medication.module';
import { MedicalOrderModule } from './modules/medical-order/medical-order.module';
import { MedicalAppointmentModule } from './modules/medical-appointment/medical-appointment.module';
import { MedicalOrderMedicationModule } from './modules/medical-order-medication/medical-order-medication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    PatientModule,
    DoctorModule,
    MedicalAppointmentModule,
    MedicalOrderModule,
    MedicationModule,
    MedicalOrderMedicationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
