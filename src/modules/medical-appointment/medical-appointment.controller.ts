import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Logger,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  CreateMedicalAppointmentDto,
  MedicalAppointmentBasicDto,
  UpdateMedicalAppointmentDto,
} from './medical-appointment.dto';
import { MedicalAppointmentService } from './medical-appointment.service';

@Controller('medical-appointments')
export class MedicalAppointmentController {
  private readonly logger = new Logger(MedicalAppointmentController.name);
  constructor(
    private readonly medicalAppointmentService: MedicalAppointmentService,
  ) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() params: CreateMedicalAppointmentDto,
  ): Promise<MedicalAppointmentBasicDto> {
    try {
      this.logger.log(
        `Starting creation medical appointment: ${params.doctorId}`,
      );

      const newMedicalAppointment = await this.medicalAppointmentService.create(
        params,
      );

      this.logger.log(`Medical appointment created successfully`);

      return newMedicalAppointment;
    } catch (error) {
      this.logger.log(`Error creating medical appointment`);
      throw error;
    }
  }

  @Get('filter')
  async findOneByParams(
    @Query() params: Partial<MedicalAppointmentBasicDto>,
  ): Promise<MedicalAppointmentBasicDto[]> {
    try {
      this.logger.log(`Starting find medical appointments by params}`);

      const medicalAppointments =
        await this.medicalAppointmentService.findManyByParams(params);

      this.logger.log(`Medical appointments fetched successfully`);

      return medicalAppointments;
    } catch (error) {
      this.logger.log(`Error fetching medical appointments by params `);
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<MedicalAppointmentBasicDto[]> {
    try {
      this.logger.log(`Starting fetch all medical appointments`);

      const medicalAppointments =
        await this.medicalAppointmentService.findAll();

      this.logger.log(`Medical appointments fetched successfully`);

      return medicalAppointments;
    } catch (error) {
      this.logger.log(`Error fetching medical appointments`);
      throw error;
    }
  }

  @Get(':medicalAppointmentId')
  async findByMedicalAppointmentId(
    @Param('medicalAppointmentId') medicalAppointmentId: string,
  ): Promise<MedicalAppointmentBasicDto> {
    try {
      this.logger.log(
        `Starting find medical appointment by medical appointment id: ${medicalAppointmentId}`,
      );

      const medicalAppointment = await this.medicalAppointmentService.findOne(
        medicalAppointmentId,
      );

      this.logger.log(`Medical appointment fetched successfully`);

      return medicalAppointment;
    } catch (error) {
      this.logger.log(
        `Error fetching medical appointment by medical appointment id ${medicalAppointmentId} `,
      );
      throw error;
    }
  }

  @Put(':medicalAppointmentId')
  async update(
    @Param('medicalAppointmentId') medicalAppointmentId: string,
    @Body() params: UpdateMedicalAppointmentDto,
  ): Promise<MedicalAppointmentBasicDto> {
    try {
      this.logger.log(
        `Starting updated medical appointment: ${medicalAppointmentId} to ${params.status}`,
      );

      const updatedMedicalAppointment =
        await this.medicalAppointmentService.update(
          medicalAppointmentId,
          params,
        );

      this.logger.log(`Medical appointment updated successfully`);

      return updatedMedicalAppointment;
    } catch (error) {
      this.logger.log(`Error updating medical appointment`);
      throw error;
    }
  }
}
