import {
  CreatePatientDto,
  PatientBasicDto,
  UpdatePatientDto,
} from './patient.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Logger,
  HttpCode,
} from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
  private readonly logger = new Logger(PatientController.name);
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() params: CreatePatientDto): Promise<PatientBasicDto> {
    try {
      this.logger.log(`Starting creation patient: ${params.id}`);

      const newPatient = await this.patientService.create(params);

      this.logger.log(`Patient created successfully`);

      return newPatient;
    } catch (error) {
      this.logger.error(`Error creating patient`);
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<PatientBasicDto[]> {
    try {
      this.logger.log(`Starting fetch all patients`);

      const patients = await this.patientService.findAll();

      this.logger.log(`Patients fetched successfully`);

      return patients;
    } catch (error) {
      this.logger.error(`Error fetching patients`);
      throw error;
    }
  }

  @Get(':patientId')
  async findByPatientId(
    @Param('patientId') patientId: string,
  ): Promise<PatientBasicDto> {
    try {
      this.logger.log(`Starting find patient by patient id: ${patientId}`);

      const patient = await this.patientService.findOne(patientId);

      this.logger.log(`Patient fetched successfully`);

      return patient;
    } catch (error) {
      this.logger.error(`Error fetching patient by patient ${patientId} `);
      throw error;
    }
  }

  @Put(':patientId')
  async update(
    @Param('patientId') patientId: string,
    @Body() params: UpdatePatientDto,
  ): Promise<PatientBasicDto> {
    try {
      this.logger.log(`Starting updated patient: ${patientId}`);

      const updatedPatient = await this.patientService.update(
        patientId,
        params,
      );

      this.logger.log(`Patient updated successfully`);

      return updatedPatient;
    } catch (error) {
      this.logger.error(`Error updating patient`);
      throw error;
    }
  }
}
