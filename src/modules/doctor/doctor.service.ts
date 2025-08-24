import { IDoctor } from './doctor.interface';
import { DoctorDbService } from '../../db/doctor/doctor.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DoctorService {
  private readonly logger = new Logger(DoctorService.name);
  constructor(private readonly doctorDbService: DoctorDbService) {}

  async create(params: Partial<IDoctor>): Promise<IDoctor> {
    this.logger.log(`Verifying if doctor exist: ${params.id}`);
    const existingDoctor = await this.findOneById(params.id);

    if (existingDoctor) {
      this.logger.log(`Doctor already exist`);
      throw new BadRequestException(
        `Doctor with ID ${params.id} already exists`,
      );
    }
    return this.doctorDbService.create(params);
  }

  async findAll(): Promise<IDoctor[]> {
    return this.doctorDbService.findAll();
  }

  async findOne(doctorId: string): Promise<IDoctor> {
    this.logger.log(`Verifying if doctor exist: ${doctorId}`);
    const existingDoctor = await this.doctorDbService.findOne(doctorId);

    if (!existingDoctor) {
      this.logger.log(`Doctor does not exist`);
      throw new BadRequestException(
        `Doctor with ID ${doctorId} does not exists`,
      );
    }

    return existingDoctor;
  }

  async findOneById(id: string): Promise<IDoctor> {
    return this.doctorDbService.findOneById(id);
  }

  async update(doctorId: string, params: Partial<IDoctor>): Promise<IDoctor> {
    this.logger.log(`Verifying if doctor exist: ${doctorId}`);
    const existingDoctor = await this.doctorDbService.findOne(doctorId);

    if (!existingDoctor) {
      this.logger.log(`Doctor does not exist`);
      throw new BadRequestException(
        `Doctor with ID ${doctorId} does not exists`,
      );
    }

    return this.doctorDbService.update(doctorId, params);
  }
}
