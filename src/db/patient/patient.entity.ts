import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MedicalAppointmentEntity } from '../medical-appointment/medical-appointment.entity';

@Entity({ name: 'patient' })
export class PatientEntity {
  @PrimaryColumn('uuid', {
    name: 'patient_id',
  })
  patientId: string;

  @Column({
    name: 'id',
    type: 'varchar',
    nullable: false,
    length: 20,
  })
  id: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: false,
    length: 90,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: false,
    length: 90,
  })
  lastName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    length: 200,
  })
  email: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: false,
    length: 20,
  })
  phone: string;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: false,
    length: 200,
  })
  address: string;

  @Column({
    name: 'city',
    type: 'varchar',
    nullable: false,
    length: 90,
  })
  city: string;

  @OneToMany(
    () => MedicalAppointmentEntity,
    (medicalAppointment) => medicalAppointment.patient,
  )
  medicalAppointments: MedicalAppointmentEntity[];
}
