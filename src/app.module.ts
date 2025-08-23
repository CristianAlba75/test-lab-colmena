import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/db/typeorm.config';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
