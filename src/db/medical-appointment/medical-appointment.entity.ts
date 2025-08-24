import { DoctorEntity } from '../doctor/doctor.entity';
import { PatientEntity } from '../patient/patient.entity';
import { EMedicalAppointmentStatus } from '../../commons/enum/common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { MedicalOrderEntity } from '../medical-order/medical-order.entity';

@Entity({ name: 'medical_appointment' })
export class MedicalAppointmentEntity {
  @PrimaryColumn('uuid', {
    name: 'medical_appointment_id',
  })
  medicalAppointmentId: string;

  @Column({
    name: 'appointment_date',
    nullable: false,
    type: 'timestamptz',
  })
  appointmentDate: Date;

  @Column({
    name: 'status',
    nullable: false,
    type: 'varchar',
  })
  status: EMedicalAppointmentStatus;

  @Column({
    name: 'date_update_status',
    nullable: true,
    type: 'timestamptz',
  })
  dateUpdateStatus?: Date;

  @Column({ name: 'doctor_id', type: 'uuid' })
  doctorId: string;

  @Column({ name: 'patient_id', type: 'uuid' })
  patientId: string;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.medicalAppointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor?: DoctorEntity;

  @ManyToOne(() => PatientEntity, (patient) => patient.medicalAppointments)
  @JoinColumn({ name: 'patient_id' })
  patient?: PatientEntity;

  @OneToMany(
    () => MedicalOrderEntity,
    (medicalOrder) => medicalOrder.medicalAppointment,
  )
  medicalOrders?: MedicalOrderEntity[];
}
