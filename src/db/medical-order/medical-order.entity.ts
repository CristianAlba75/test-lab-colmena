import { ESpecialty } from '../../commons/enum/common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { MedicalAppointmentEntity } from '../medical-appointment/medical-appointment.entity';
import { MedicalOrderMedicationEntity } from '../medical-order-medication/medical-order-medication.entity';

@Entity({ name: 'medical_order' })
export class MedicalOrderEntity {
  @PrimaryColumn('uuid', {
    name: 'medical_order_id',
  })
  medicalOrderId: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'expiration_date',
    nullable: false,
    type: 'timestamptz',
  })
  expirationDate: Date;

  @Column({
    name: 'speciality',
    nullable: false,
    type: 'varchar',
  })
  speciality: ESpecialty;

  @Column({ name: 'medical_appointment_id', type: 'uuid' })
  medicalAppointmentId: string;

  @ManyToOne(
    () => MedicalAppointmentEntity,
    (medicalAppointment) => medicalAppointment.medicalOrders,
  )
  @JoinColumn({ name: 'medical_appointment_id' })
  medicalAppointment: MedicalAppointmentEntity;

  @OneToMany(
    () => MedicalOrderMedicationEntity,
    (medicalOrderMedication) => medicalOrderMedication.medicalOrder,
  )
  medicalOrderMedications: MedicalOrderMedicationEntity[];
}
