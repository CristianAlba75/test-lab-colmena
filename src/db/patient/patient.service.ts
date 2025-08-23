import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PatientEntity } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientDbService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
  ) {}

  async create(data: Partial<PatientEntity>): Promise<PatientEntity> {
    const newObj = this.patientRepository.create({
      patientId: uuidv4(),
      ...data,
    });
    return this.patientRepository.save(newObj);
  }

  async update(
    patientId: string,
    data: Partial<PatientEntity>,
  ): Promise<PatientEntity> {
    const existingObj = await this.findOne(patientId);
    Object.assign(existingObj, data);
    return this.patientRepository.save(existingObj);
  }

  async findAll(): Promise<PatientEntity[]> {
    return this.patientRepository.find();
  }

  async findOne(patientId: string): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOneBy({ patientId });
    if (!patient) return null;
    return patient;
  }

  async findOneById(id: string): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOneBy({ id });
    if (!patient) return null;
    return patient;
  }
}
