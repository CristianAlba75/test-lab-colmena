import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DoctorEntity } from './doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DoctorDbService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async create(data: Partial<DoctorEntity>): Promise<DoctorEntity> {
    const newObj = this.doctorRepository.create({
      doctorId: uuidv4(),
      ...data,
    });
    return this.doctorRepository.save(newObj);
  }

  async update(
    doctorId: string,
    data: Partial<DoctorEntity>,
  ): Promise<DoctorEntity> {
    const existingObj = await this.findOne(doctorId);
    Object.assign(existingObj, data);
    return this.doctorRepository.save(existingObj);
  }

  async findAll(): Promise<DoctorEntity[]> {
    return this.doctorRepository.find();
  }

  async findOne(doctorId: string): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOneBy({ doctorId });
    if (!doctor) return null;
    return doctor;
  }

  async findOneById(id: string): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (!doctor) return null;
    return doctor;
  }
}
