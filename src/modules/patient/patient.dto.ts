import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class PatientBasicDto {
  @IsString()
  @IsOptional()
  patientId?: string;

  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string;
}

export class CreatePatientDto extends PatientBasicDto {}

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
