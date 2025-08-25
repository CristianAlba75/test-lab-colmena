import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Logger,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  CreateMedicalOrderMedicationBasicDtoDto,
  MedicalOrderMedicationBasicDto,
} from './medical-order-medication.dto';
import { ERoles } from '../../commons/enum/common';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../shared/decorators/role.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt.auth.guard';
import { MedicalOrderMedicationService } from './medical-order-medication.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('medical-orders-medications')
export class MedicalOrderMedicationController {
  private readonly logger = new Logger(MedicalOrderMedicationController.name);
  constructor(
    private readonly medicalOrderMedicationService: MedicalOrderMedicationService,
  ) {}

  @Role([ERoles.DOCTOR])
  @Post()
  @HttpCode(200)
  async create(
    @Body() params: CreateMedicalOrderMedicationBasicDtoDto,
  ): Promise<MedicalOrderMedicationBasicDto> {
    try {
      this.logger.log(
        `Starting creation medical order medication by medical order: ${params.medicalOrderId}`,
      );

      const newMedicalOrderMedication =
        await this.medicalOrderMedicationService.create(params);

      this.logger.log(`Medical order medication created successfully`);

      return newMedicalOrderMedication;
    } catch (error) {
      this.logger.error(`Error creating medical order medication`);
      throw error;
    }
  }

  @Role([ERoles.ADMIN])
  @Get()
  async findAll(): Promise<MedicalOrderMedicationBasicDto[]> {
    try {
      this.logger.log(`Starting fetch all medical orders medications`);

      const medicalOrderMedications =
        await this.medicalOrderMedicationService.findAll();

      this.logger.log(`Medical orders medications fetched successfully`);

      return medicalOrderMedications;
    } catch (error) {
      this.logger.error(`Error fetching medical orders medications`);
      throw error;
    }
  }

  @Role([ERoles.DOCTOR, ERoles.PATIENT])
  @Get(':id')
  async findOneById(
    @Param('id') id: string,
  ): Promise<MedicalOrderMedicationBasicDto> {
    try {
      this.logger.log(`Starting find medical order medication by id: ${id}`);

      const medicalOrderMedication =
        await this.medicalOrderMedicationService.findOneById(id);

      this.logger.log(`Medical order fetched successfully`);

      return medicalOrderMedication;
    } catch (error) {
      this.logger.error(`Error fetching medical order medication by id ${id} `);
      throw error;
    }
  }

  @Role([ERoles.DOCTOR, ERoles.PATIENT])
  @Get('medical-order/:medicalOrderId')
  async findAllByMedicalOrderId(
    @Param('medicalOrderId') medicalOrderId: string,
  ): Promise<MedicalOrderMedicationBasicDto[]> {
    try {
      this.logger.log(
        `Starting find medical orders medications by medical order id: ${medicalOrderId}`,
      );

      const medicalOrdersMedications =
        await this.medicalOrderMedicationService.findAllByMedicalOrderId(
          medicalOrderId,
        );

      this.logger.log(`Medical orders medications fetched successfully`);

      return medicalOrdersMedications;
    } catch (error) {
      this.logger.error(
        `Error fetching medical orders medications by medical order id ${medicalOrderId} `,
      );
      throw error;
    }
  }
}
