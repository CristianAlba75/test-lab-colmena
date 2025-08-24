import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalOrderEntity } from './medical-order.entity';

@Injectable()
export class MedicalOrderDbService {
  constructor(
    @InjectRepository(MedicalOrderEntity)
    private readonly medicalOrderRepository: Repository<MedicalOrderEntity>,
  ) {}

  async create(data: Partial<MedicalOrderEntity>): Promise<MedicalOrderEntity> {
    const newObj = this.medicalOrderRepository.create({
      medicalOrderId: uuidv4(),
      ...data,
    });
    return this.medicalOrderRepository.save(newObj);
  }

  async findAll(): Promise<MedicalOrderEntity[]> {
    return this.medicalOrderRepository.find();
  }

  async findOneByMedicalOrderId(
    medicalOrderId: string,
  ): Promise<MedicalOrderEntity> {
    const medicalOrder = await this.medicalOrderRepository.findOneBy({
      medicalOrderId,
    });
    if (!medicalOrder) return null;
    return medicalOrder;
  }

  async findAllByMedicalAppointmentId(
    medicalAppointmentId: string,
  ): Promise<MedicalOrderEntity[]> {
    const medicalOrders = await this.medicalOrderRepository.findBy({
      medicalAppointmentId,
    });
    if (!medicalOrders) return null;
    return medicalOrders;
  }
}
