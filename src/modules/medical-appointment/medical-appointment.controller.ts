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
  UseGuards,
} from '@nestjs/common';
import {
  CreateMedicalAppointmentDto,
  MedicalAppointmentBasicDto,
  UpdateMedicalAppointmentDto,
} from './medical-appointment.dto';
import { ERoles } from '../../commons/enum/common';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../shared/decorators/role.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt.auth.guard';
import { MedicalAppointmentService } from './medical-appointment.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('medical-appointments')
export class MedicalAppointmentController {
  private readonly logger = new Logger(MedicalAppointmentController.name);
  constructor(
    private readonly medicalAppointmentService: MedicalAppointmentService,
  ) {}

  @Role([ERoles.ADMIN])
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

  @Role([ERoles.ADMIN])
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
      this.logger.error(`Error fetching medical appointments by params `);
      throw error;
    }
  }

  @Role([ERoles.ADMIN])
  @Get()
  async findAll(): Promise<MedicalAppointmentBasicDto[]> {
    try {
      this.logger.log(`Starting fetch all medical appointments`);

      const medicalAppointments =
        await this.medicalAppointmentService.findAll();

      this.logger.log(`Medical appointments fetched successfully`);

      return medicalAppointments;
    } catch (error) {
      this.logger.error(`Error fetching medical appointments`);
      throw error;
    }
  }

  @Role([ERoles.ADMIN, ERoles.DOCTOR, ERoles.PATIENT])
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
      this.logger.error(
        `Error fetching medical appointment by medical appointment id ${medicalAppointmentId} `,
      );
      throw error;
    }
  }

  @Role([ERoles.DOCTOR])
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
      this.logger.error(`Error updating medical appointment`);
      throw error;
    }
  }
}
