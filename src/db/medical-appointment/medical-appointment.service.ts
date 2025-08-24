import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EMedicalAppointmentStatus } from '../../commons/enum/common';
import { MedicalAppointmentEntity } from './medical-appointment.entity';

@Injectable()
export class MedicalAppointmentDbService {
  constructor(
    @InjectRepository(MedicalAppointmentEntity)
    private readonly medicalAppointmentRepository: Repository<MedicalAppointmentEntity>,
  ) {}

  async create(
    data: Partial<MedicalAppointmentEntity>,
  ): Promise<MedicalAppointmentEntity> {
    const newObj = this.medicalAppointmentRepository.create({
      medicalAppointmentId: uuidv4(),
      status: EMedicalAppointmentStatus.SCHEDULED,
      ...data,
    });
    return this.medicalAppointmentRepository.save(newObj);
  }

  async update(
    medicalAppointmentId: string,
    data: Partial<MedicalAppointmentEntity>,
  ): Promise<MedicalAppointmentEntity> {
    const existingObj = await this.findOne(medicalAppointmentId);
    Object.assign(existingObj, data);
    return this.medicalAppointmentRepository.save({
      ...existingObj,
      dateUpdateStatus: new Date(),
    });
  }

  async findAll(): Promise<MedicalAppointmentEntity[]> {
    return this.medicalAppointmentRepository.find();
  }

  async findOne(
    medicalAppointmentId: string,
  ): Promise<MedicalAppointmentEntity> {
    const medicalAppointment =
      await this.medicalAppointmentRepository.findOneBy({
        medicalAppointmentId,
      });
    if (!medicalAppointment) return null;
    return medicalAppointment;
  }

  async findOneByParams(
    params: Partial<MedicalAppointmentEntity>,
  ): Promise<MedicalAppointmentEntity> {
    const medicalAppointment =
      await this.medicalAppointmentRepository.findOneBy({ ...params });
    if (!medicalAppointment) return null;
    return medicalAppointment;
  }

  async findManyByParams(
    params: Partial<MedicalAppointmentEntity>,
  ): Promise<MedicalAppointmentEntity[]> {
    const medicalAppointment = await this.medicalAppointmentRepository.findBy({
      ...params,
    });
    if (!medicalAppointment) return null;
    return medicalAppointment;
  }
}
