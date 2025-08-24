import { IMedicalOrder } from './medical-order.interface';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MedicalOrderDbService } from '../../db/medical-order/medical-order.service';
import { MedicalAppointmentService } from '../medical-appointment/medical-appointment.service';

@Injectable()
export class MedicalOrderService {
  private readonly logger = new Logger(MedicalOrderService.name);
  constructor(
    private readonly medicalOrderDbService: MedicalOrderDbService,
    private readonly medicalAppointmentService: MedicalAppointmentService,
  ) {}

  async create(params: Partial<IMedicalOrder>): Promise<IMedicalOrder> {
    this.logger.log(
      `Verifying if medical appointment exists: ${params.medicalAppointmentId}`,
    );
    const existingMedicalAppointment =
      await this.medicalAppointmentService.findOne(params.medicalAppointmentId);

    if (!existingMedicalAppointment) {
      this.logger.error(`Medical appointment does not exists`);
      throw new BadRequestException(
        `Medical appointment with ID ${params.medicalAppointmentId} does not exists`,
      );
    }
    return this.medicalOrderDbService.create(params);
  }

  async findAll(): Promise<IMedicalOrder[]> {
    return this.medicalOrderDbService.findAll();
  }

  async findOneByMedicalOrderId(
    medicalOrderId: string,
  ): Promise<IMedicalOrder> {
    this.logger.log(`Verifying if medical order exist: ${medicalOrderId}`);
    const existingMedicalOrder =
      await this.medicalOrderDbService.findOneByMedicalOrderId(medicalOrderId);

    if (!existingMedicalOrder) {
      this.logger.error(`Medical order does not exist`);
      throw new BadRequestException(
        `Medical order with ID ${medicalOrderId} does not exists`,
      );
    }

    return existingMedicalOrder;
  }

  async findAllByMedicalAppointmentId(
    medicalAppointmentId: string,
  ): Promise<IMedicalOrder[]> {
    this.logger.log(
      `Verifying if medical orders exists by medical appointment id: ${medicalAppointmentId}`,
    );
    const existingMedicalOrders =
      await this.medicalOrderDbService.findAllByMedicalAppointmentId(
        medicalAppointmentId,
      );

    if (existingMedicalOrders.length === 0) {
      this.logger.error(
        `There are not available medical orders for medical appointment`,
      );
      throw new BadRequestException(
        `Not available medical orders for medical appointment with ID ${medicalAppointmentId}`,
      );
    }

    return existingMedicalOrders;
  }
}
