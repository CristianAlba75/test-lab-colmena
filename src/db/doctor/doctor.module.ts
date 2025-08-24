import { Module } from '@nestjs/common';
import { DoctorEntity } from './doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorDbService } from './doctor.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  exports: [DoctorDbService],
  providers: [DoctorDbService],
})
export class DoctorDbModule {}
