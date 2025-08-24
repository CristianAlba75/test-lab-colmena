import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ESpecialty } from '../../commons/enum/common';

export class MedicalOrderBasicDto {
  @IsString()
  @IsOptional()
  medicalOrderId?: string;

  @IsUUID()
  medicalAppointmentId: string;

  @IsString()
  description: string;

  @IsDateString()
  expirationDate: Date;

  @IsEnum(ESpecialty)
  speciality: ESpecialty;
}

export class CreateMedicalOrderBasicDtoDto extends MedicalOrderBasicDto {}
