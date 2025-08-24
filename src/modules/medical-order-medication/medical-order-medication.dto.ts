import { IsOptional, IsString, IsUUID } from 'class-validator';

export class MedicalOrderMedicationBasicDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsUUID()
  medicalOrderId: string;

  @IsUUID()
  medicationId: string;

  @IsString()
  dose: string;
}

export class CreateMedicalOrderMedicationBasicDtoDto extends MedicalOrderMedicationBasicDto {}
