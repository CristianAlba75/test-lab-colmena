import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { MedicationEntity } from '../medication/medication.entity';
import { MedicalOrderEntity } from '../medical-order/medical-order.entity';

@Entity({ name: 'medical_order_medication' })
export class MedicalOrderMedicationEntity {
  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => MedicalOrderEntity, (order) => order.medicalOrderMedications)
  @JoinColumn({ name: 'medical_order_id' })
  medicalOrder: MedicalOrderEntity;

  @ManyToOne(
    () => MedicationEntity,
    (medication) => medication.medicalOrderMedications,
  )
  @JoinColumn({ name: 'medication_id' })
  medication: MedicationEntity;

  @Column({
    name: 'dose',
    type: 'varchar',
    nullable: false,
  })
  dose: string;
}
