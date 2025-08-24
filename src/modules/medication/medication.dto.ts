import { IsArray, IsOptional, IsString } from 'class-validator';

export class MedicationBasicDto {
  @IsString()
  @IsOptional()
  medicationId?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  diseases: string[];
}

export class CreateMedicationDto extends MedicationBasicDto {}
