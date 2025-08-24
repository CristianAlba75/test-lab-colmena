import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Logger,
  HttpCode,
} from '@nestjs/common';
import {
  CreateMedicalOrderBasicDtoDto,
  MedicalOrderBasicDto,
} from './medical-order.dto';
import { MedicalOrderService } from './medical-order.service';

@Controller('medical-orders')
export class MedicalOrderController {
  private readonly logger = new Logger(MedicalOrderController.name);
  constructor(private readonly medicalOrderService: MedicalOrderService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() params: CreateMedicalOrderBasicDtoDto,
  ): Promise<MedicalOrderBasicDto> {
    try {
      this.logger.log(
        `Starting creation medical order by medical appointment: ${params.medicalAppointmentId}`,
      );

      const newMedicalOrder = await this.medicalOrderService.create(params);

      this.logger.log(`Medical order created successfully`);

      return newMedicalOrder;
    } catch (error) {
      this.logger.error(`Error creating medical order`);
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<MedicalOrderBasicDto[]> {
    try {
      this.logger.log(`Starting fetch all medical orders`);

      const medicalOrders = await this.medicalOrderService.findAll();

      this.logger.log(`Medical orders fetched successfully`);

      return medicalOrders;
    } catch (error) {
      this.logger.error(`Error fetching medical orders`);
      throw error;
    }
  }

  @Get('order/:medicalOrderId')
  async findByMedicalOrderId(
    @Param('medicalOrderId') medicalOrderId: string,
  ): Promise<MedicalOrderBasicDto> {
    try {
      this.logger.log(
        `Starting find medical orders by medical order id: ${medicalOrderId}`,
      );

      const medicalOrder =
        await this.medicalOrderService.findOneByMedicalOrderId(medicalOrderId);

      this.logger.log(`Medical order fetched successfully`);

      return medicalOrder;
    } catch (error) {
      this.logger.error(
        `Error fetching medical order by medical order id ${medicalOrderId} `,
      );
      throw error;
    }
  }

  @Get('medical-appointment/:medicalAppointmentId')
  async findAllByMedicalAppointmentId(
    @Param('medicalAppointmentId') medicalAppointmentId: string,
  ): Promise<MedicalOrderBasicDto[]> {
    try {
      this.logger.log(
        `Starting find medical orders by medical appointment id: ${medicalAppointmentId}`,
      );

      const medicalOrders =
        await this.medicalOrderService.findAllByMedicalAppointmentId(
          medicalAppointmentId,
        );

      this.logger.log(`Medical orders fetched successfully`);

      return medicalOrders;
    } catch (error) {
      this.logger.error(
        `Error fetching medical orders by medical appointment id ${medicalAppointmentId} `,
      );
      throw error;
    }
  }
}
