import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalOrderEntity } from './medical-order.entity';
import { MedicalOrderDbService } from './medical-order.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalOrderEntity])],
  exports: [MedicalOrderDbService],
  providers: [MedicalOrderDbService],
})
export class MedicalOrderDbModule {}
