import { MedicationService } from '../medication/medication.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MedicalOrderService } from '../medical-order/medical-order.service';
import { IMedicalOrderMedication } from './medical-order-medication.interface';
import { MedicalOrderMedicationDbService } from '../../db/medical-order-medication/medical-order-medication.service';

@Injectable()
export class MedicalOrderMedicationService {
  private readonly logger = new Logger(MedicalOrderMedicationService.name);
  constructor(
    private readonly medicalOrderMedicationService: MedicalOrderMedicationDbService,
    private readonly medicalOrderService: MedicalOrderService,
    private readonly medicationService: MedicationService,
  ) {}

  async create(
    params: Partial<IMedicalOrderMedication>,
  ): Promise<IMedicalOrderMedication> {
    this.logger.log(
      `Verifying if medical order exists: ${params.medicalOrderId}`,
    );
    const existingMedicalOrder =
      await this.medicalOrderService.findOneByMedicalOrderId(
        params.medicalOrderId,
      );

    if (!existingMedicalOrder) {
      this.logger.error(`Medical order does not exists`);
      throw new BadRequestException(
        `Medical order with ID ${params.medicalOrderId} does not exists`,
      );
    }

    this.logger.log(`Verifying if medication exist: ${params.medicationId}`);
    const existingMedication =
      await this.medicationService.findOneByMedicationId(params.medicationId);

    if (!existingMedication) {
      this.logger.error(`Medication does not exists`);
      throw new BadRequestException(
        `Medication with ID ${params.medicationId} does not exists`,
      );
    }
    return this.medicalOrderMedicationService.create(params);
  }

  async findAll(): Promise<IMedicalOrderMedication[]> {
    return this.medicalOrderMedicationService.findAll();
  }

  async findOneById(id: string): Promise<IMedicalOrderMedication> {
    this.logger.log(`Verifying if medical order medication exist: ${id}`);
    const existingMedicalOrderMedication =
      await this.medicalOrderMedicationService.findOneById(id);

    if (!existingMedicalOrderMedication) {
      this.logger.error(`Medical order medication does not exist`);
      throw new BadRequestException(
        `Medical order medication with ID ${id} does not exists`,
      );
    }

    return existingMedicalOrderMedication;
  }

  async findAllByMedicalOrderId(
    medicalOrderId: string,
  ): Promise<IMedicalOrderMedication[]> {
    this.logger.log(
      `Verifying if medical orders medication exists by medical order id: ${medicalOrderId}`,
    );
    const existingMedicalOrdersMedication =
      await this.medicalOrderMedicationService.findAllByMedicalOrderId(
        medicalOrderId,
      );

    if (existingMedicalOrdersMedication.length === 0) {
      this.logger.error(
        `There are not available medical orders medication for medical order id`,
      );
      throw new BadRequestException(
        `Not available medical orders medication for medical order with ID ${medicalOrderId}`,
      );
    }

    return existingMedicalOrdersMedication;
  }
}
