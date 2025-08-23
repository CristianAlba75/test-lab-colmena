import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MedicalOrderMedicationEntity } from '../medical-order-medication/medical-order-medication.entity';

@Entity({ name: 'medication' })
export class MedicationEntity {
  @PrimaryColumn('uuid', {
    name: 'medication_id',
  })
  medicationId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'diseases',
    type: 'text',
    nullable: false,
  })
  diseases: string;

  @OneToMany(
    () => MedicalOrderMedicationEntity,
    (medicalOrderMedication) => medicalOrderMedication.medication,
  )
  medicalOrderMedications: MedicalOrderMedicationEntity[];
}
