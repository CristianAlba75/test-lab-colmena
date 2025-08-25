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
import { ERoles } from '../../commons/enum/common';
import { MedicationService } from './medication.service';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../shared/decorators/role.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt.auth.guard';
import { CreateMedicationDto, MedicationBasicDto } from './medication.dto';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('medications')
export class MedicationController {
  private readonly logger = new Logger(MedicationController.name);
  constructor(private readonly medicationService: MedicationService) {}

  @Role([ERoles.ADMIN])
  @Post()
  @HttpCode(200)
  async create(
    @Body() params: CreateMedicationDto,
  ): Promise<MedicationBasicDto> {
    try {
      this.logger.log(`Starting creation medication: ${params.name}`);

      const newMedication = await this.medicationService.create(params);

      this.logger.log(`Medication created successfully`);

      return newMedication;
    } catch (error) {
      this.logger.error(`Error creating medication`);
      throw error;
    }
  }

  @Role([ERoles.ADMIN, ERoles.DOCTOR])
  @Get()
  async findAll(): Promise<MedicationBasicDto[]> {
    try {
      this.logger.log(`Starting fetch all medications`);

      const doctors = await this.medicationService.findAll();

      this.logger.log(`Medications fetched successfully`);

      return doctors;
    } catch (error) {
      this.logger.error(`Error fetching medications`);
      throw error;
    }
  }

  @Role([ERoles.ADMIN, ERoles.DOCTOR, ERoles.PATIENT])
  @Get(':medicationId')
  async findByMedicationId(
    @Param('medicationId') medicationId: string,
  ): Promise<MedicationBasicDto> {
    try {
      this.logger.log(
        `Starting find medication by medication id: ${medicationId}`,
      );

      const medication = await this.medicationService.findOneByMedicationId(
        medicationId,
      );

      this.logger.log(`Medication fetched successfully`);

      return medication;
    } catch (error) {
      this.logger.error(
        `Error fetching medication by medication id ${medicationId} `,
      );
      throw error;
    }
  }

  @Role([ERoles.ADMIN, ERoles.DOCTOR])
  @Get('disease/:disease')
  async findByDisease(
    @Param('disease') disease: string,
  ): Promise<MedicationBasicDto[]> {
    try {
      this.logger.log(`Starting find medication by disease: ${disease}`);

      const medicationByDisease = await this.medicationService.findByDisease(
        disease,
      );

      this.logger.log(`Medication by disease fetched successfully`);

      return medicationByDisease;
    } catch (error) {
      this.logger.error(`Error fetching medication by disease ${disease} `);
      throw error;
    }
  }
}
