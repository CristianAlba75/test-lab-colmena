import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class DoctorBasicDto {
  @IsString()
  @IsOptional()
  doctorId?: string;

  @IsString()
  id: string;

  @IsString()
  professionalCard: string;

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

  @IsDateString()
  admissionDate: Date;
}

export class CreateDoctorDto extends DoctorBasicDto {}

export class UpdateDoctorDto extends PartialType(DoctorBasicDto) {}
