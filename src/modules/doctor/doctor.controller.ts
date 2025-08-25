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
import { DoctorService } from './doctor.service';
import { ERoles } from '../../commons/enum/common';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../shared/decorators/role.decorator';
import { JwtAuthGuard } from '../../shared/guards/jwt.auth.guard';
import { CreateDoctorDto, DoctorBasicDto, UpdateDoctorDto } from './doctor.dto';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('doctors')
export class DoctorController {
  private readonly logger = new Logger(DoctorController.name);
  constructor(private readonly doctorService: DoctorService) {}

  @Role([ERoles.ADMIN])
  @Post()
  @HttpCode(200)
  async create(
    @Body() { password, ...params }: CreateDoctorDto,
  ): Promise<DoctorBasicDto> {
    try {
      this.logger.log(`Starting creation doctor: ${params.id}`);

      const newDoctor = await this.doctorService.create(params, password);

      this.logger.log(`Doctor created successfully`);

      return newDoctor;
    } catch (error) {
      this.logger.error(`Error creating doctor`);
      throw error;
    }
  }

  @Role([ERoles.ADMIN])
  @Get('availability')
  async findAvailableByDate(
    @Query('selectedDate') selectedDate: string,
  ): Promise<DoctorBasicDto[]> {
    try {
      this.logger.log(
        `Starting fetch all doctors available for date: ${selectedDate}`,
      );

      const availableDoctors =
        await this.doctorService.findAvailableDoctorsByDate(selectedDate);

      this.logger.log(`Available doctors fetched successfully`);

      return availableDoctors;
    } catch (error) {
      this.logger.error(`Error fetching available doctors`);
      throw error;
    }
  }

  @Role([ERoles.ADMIN])
  @Get()
  async findAll(): Promise<DoctorBasicDto[]> {
    try {
      this.logger.log(`Starting fetch all doctors`);

      const doctors = await this.doctorService.findAll();

      this.logger.log(`Doctors fetched successfully`);

      return doctors;
    } catch (error) {
      this.logger.error(`Error fetching doctors`);
      throw error;
    }
  }

  @Role([ERoles.ADMIN])
  @Get(':doctorId')
  async findByDoctorId(
    @Param('doctorId') doctorId: string,
  ): Promise<DoctorBasicDto> {
    try {
      this.logger.log(`Starting find doctor by doctor id: ${doctorId}`);

      const doctor = await this.doctorService.findOne(doctorId);

      this.logger.log(`Doctor fetched successfully`);

      return doctor;
    } catch (error) {
      this.logger.error(`Error fetching doctor by doctor ${doctorId} `);
      throw error;
    }
  }

  @Role([ERoles.ADMIN])
  @Put(':doctorId')
  async update(
    @Param('doctorId') doctorId: string,
    @Body() params: UpdateDoctorDto,
  ): Promise<DoctorBasicDto> {
    try {
      this.logger.log(`Starting updated doctor: ${doctorId}`);

      const updatedDoctor = await this.doctorService.update(doctorId, params);

      this.logger.log(`Doctor updated successfully`);

      return updatedDoctor;
    } catch (error) {
      this.logger.error(`Error updating doctor`);
      throw error;
    }
  }
}
