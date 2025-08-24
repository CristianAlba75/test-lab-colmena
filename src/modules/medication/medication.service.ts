import { IMedication } from './medication.interface';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MedicationDbService } from '../../db/medication/medication.service';

@Injectable()
export class MedicationService {
  private readonly logger = new Logger(MedicationService.name);
  constructor(private readonly medicationDbService: MedicationDbService) {}

  async create(params: Partial<IMedication>): Promise<IMedication> {
    this.logger.log(`Verifying if medication exist: ${params.name}`);
    const existingMedication = await this.findByName(params.name);

    if (existingMedication) {
      this.logger.error(`Medication already exist`);
      throw new BadRequestException(
        `Medication with name ${params.name} already exists`,
      );
    }
    return this.medicationDbService.create(params);
  }

  async findAll(): Promise<IMedication[]> {
    return this.medicationDbService.findAll();
  }

  async findOneByMedicationId(medicationId: string): Promise<IMedication> {
    return this.medicationDbService.findOneByMedicationId(medicationId);
  }

  async findByName(name: string): Promise<IMedication> {
    return this.medicationDbService.findOneByName(name);
  }

  async findByDisease(disease: string): Promise<IMedication[]> {
    return this.medicationDbService.findByDisease(disease);
  }
}
