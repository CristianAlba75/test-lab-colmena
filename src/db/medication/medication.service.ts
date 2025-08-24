import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicationEntity } from './medication.entity';

@Injectable()
export class MedicationDbService {
  constructor(
    @InjectRepository(MedicationEntity)
    private readonly medicationRepository: Repository<MedicationEntity>,
  ) {}

  async create(data: Partial<MedicationEntity>): Promise<MedicationEntity> {
    const newObj = this.medicationRepository.create({
      medicationId: uuidv4(),
      ...data,
    });
    return this.medicationRepository.save(newObj);
  }

  async findAll(): Promise<MedicationEntity[]> {
    return this.medicationRepository.find();
  }

  async findOneByMedicationId(medicationId: string): Promise<MedicationEntity> {
    const medication = await this.medicationRepository.findOneBy({
      medicationId,
    });
    if (!medication) return null;
    return medication;
  }

  async findOneByName(name: string): Promise<MedicationEntity> {
    const medication = await this.medicationRepository.findOneBy({ name });
    if (!medication) return null;
    return medication;
  }

  async findByDisease(disease: string): Promise<MedicationEntity[]> {
    return this.medicationRepository
      .createQueryBuilder('medication')
      .where(':disease = ANY(medication.diseases)', { disease })
      .getMany();
  }
}
