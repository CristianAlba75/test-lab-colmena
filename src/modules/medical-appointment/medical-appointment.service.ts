import { IMedicalAppointment } from './medical-appointment.interface';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MedicalAppointmentDbService } from '../../db/medical-appointment/medical-appointment.service';

@Injectable()
export class MedicalAppointmentService {
  private readonly logger = new Logger(MedicalAppointmentService.name);
  constructor(
    private readonly medicalAppointmentDbService: MedicalAppointmentDbService,
  ) {}

  async create(
    params: Partial<IMedicalAppointment>,
  ): Promise<IMedicalAppointment> {
    this.logger.log(`Verifying if doctor is available: ${params.doctorId}`);
    const existingAppointmentByDoctor = await this.findOneByParams({
      doctorId: params.doctorId,
      appointmentDate: params.appointmentDate,
    });

    if (existingAppointmentByDoctor) {
      this.logger.log(`Doctor has an appointment for selected date`);
      throw new BadRequestException(
        `Doctor with ID ${params.doctorId} cannot attend`,
      );
    }
    return this.medicalAppointmentDbService.create(params);
  }

  async findAll(): Promise<IMedicalAppointment[]> {
    return this.medicalAppointmentDbService.findAll();
  }

  async findOne(medicalAppointmentId: string): Promise<IMedicalAppointment> {
    this.logger.log(
      `Verifying if medical appointment exist: ${medicalAppointmentId}`,
    );
    const existingMedicalAppointment =
      await this.medicalAppointmentDbService.findOne(medicalAppointmentId);

    if (!existingMedicalAppointment) {
      this.logger.log(`Medical appointment does not exist`);
      throw new BadRequestException(
        `Medical appointment with ID ${medicalAppointmentId} does not exists`,
      );
    }

    return existingMedicalAppointment;
  }

  async findOneByParams(
    params: Partial<IMedicalAppointment>,
  ): Promise<IMedicalAppointment> {
    return this.medicalAppointmentDbService.findOneByParams(params);
  }

  async findManyByParams(
    params: Partial<IMedicalAppointment>,
  ): Promise<IMedicalAppointment[]> {
    return this.medicalAppointmentDbService.findManyByParams(params);
  }

  async update(
    medicalAppointmentId: string,
    params: Partial<IMedicalAppointment>,
  ): Promise<IMedicalAppointment> {
    this.logger.log(
      `Verifying if medical appointment exist: ${medicalAppointmentId}`,
    );
    const existingMedicalAppointment =
      await this.medicalAppointmentDbService.findOne(medicalAppointmentId);

    if (!existingMedicalAppointment) {
      this.logger.log(`Medical appointment does not exist`);
      throw new BadRequestException(
        `Medical appointment with ID ${medicalAppointmentId} does not exists`,
      );
    }

    return this.medicalAppointmentDbService.update(
      medicalAppointmentId,
      params,
    );
  }
}
