import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { EMedicalAppointmentStatus } from '../../commons/enum/common';

export class MedicalAppointmentBasicDto {
  @IsString()
  @IsOptional()
  medicalAppointmentId?: string;

  @IsDateString()
  appointmentDate: Date;

  @IsUUID()
  doctorId: string;

  @IsUUID()
  patientId: string;

  @IsEnum(EMedicalAppointmentStatus)
  @IsOptional()
  status?: EMedicalAppointmentStatus;
}

export class CreateMedicalAppointmentDto extends MedicalAppointmentBasicDto {}

export class UpdateMedicalAppointmentDto extends PartialType(
  MedicalAppointmentBasicDto,
) {}
