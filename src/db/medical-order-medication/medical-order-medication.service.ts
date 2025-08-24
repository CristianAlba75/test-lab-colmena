import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalOrderMedicationEntity } from './medical-order-medication.entity';

@Injectable()
export class MedicalOrderMedicationDbService {
  constructor(
    @InjectRepository(MedicalOrderMedicationEntity)
    private readonly medicalOrderMedicationRepository: Repository<MedicalOrderMedicationEntity>,
  ) {}

  async create(
    data: Partial<MedicalOrderMedicationEntity>,
  ): Promise<MedicalOrderMedicationEntity> {
    const newObj = this.medicalOrderMedicationRepository.create({
      id: uuidv4(),
      ...data,
    });
    return this.medicalOrderMedicationRepository.save(newObj);
  }

  async findAll(): Promise<MedicalOrderMedicationEntity[]> {
    return this.medicalOrderMedicationRepository.find();
  }

  async findOneById(id: string): Promise<MedicalOrderMedicationEntity> {
    const medication = await this.medicalOrderMedicationRepository.findOneBy({
      id,
    });
    if (!medication) return null;
    return medication;
  }

  async findAllByMedicalOrderId(
    medicalOrderId: string,
  ): Promise<MedicalOrderMedicationEntity[]> {
    const medication = await this.medicalOrderMedicationRepository.findBy({
      medicalOrderId,
    });
    if (!medication) return null;
    return medication;
  }
}
