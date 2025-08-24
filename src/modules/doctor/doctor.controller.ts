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
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, DoctorBasicDto, UpdateDoctorDto } from './doctor.dto';

@Controller('doctors')
export class DoctorController {
  private readonly logger = new Logger(DoctorController.name);
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() params: CreateDoctorDto): Promise<DoctorBasicDto> {
    try {
      this.logger.log(`Starting creation doctor: ${params.id}`);

      const newDoctor = await this.doctorService.create(params);

      this.logger.log(`Doctor created successfully`);

      return newDoctor;
    } catch (error) {
      this.logger.error(`Error creating doctor`);
      throw error;
    }
  }

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
