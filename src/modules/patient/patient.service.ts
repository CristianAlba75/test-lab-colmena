import { IPatient } from './patient.interface';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PatientDbService } from '../../db/patient/patient.service';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  constructor(private readonly patientDbService: PatientDbService) {}

  async create(params: Partial<IPatient>): Promise<IPatient> {
    this.logger.log(`Verifying if patient exist: ${params.id}`);
    const existingPatient = await this.findOneById(params.id);

    if (existingPatient) {
      this.logger.log(`Patient already exist`);
      throw new BadRequestException(
        `Patient with ID ${params.id} already exists`,
      );
    }
    return this.patientDbService.create(params);
  }

  async findAll(): Promise<IPatient[]> {
    return this.patientDbService.findAll();
  }

  async findOne(patientId: string): Promise<IPatient> {
    this.logger.log(`Verifying if patient exist: ${patientId}`);
    const existingPatient = await this.patientDbService.findOne(patientId);

    if (!existingPatient) {
      this.logger.log(`Patient does not exist`);
      throw new BadRequestException(
        `Patient with ID ${patientId} does not exists`,
      );
    }

    return existingPatient;
  }

  async findOneById(id: string): Promise<IPatient> {
    return this.patientDbService.findOneById(id);
  }

  async update(
    patientId: string,
    params: Partial<IPatient>,
  ): Promise<IPatient> {
    this.logger.log(`Verifying if patient exist: ${patientId}`);
    const existingPatient = await this.patientDbService.findOne(patientId);

    if (!existingPatient) {
      this.logger.log(`Patient does not exist`);
      throw new BadRequestException(
        `Patient with ID ${patientId} does not exists`,
      );
    }

    return this.patientDbService.update(patientId, params);
  }
}
