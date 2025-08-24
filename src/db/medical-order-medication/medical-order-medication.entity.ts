import { MedicationEntity } from '../medication/medication.entity';
import { MedicalOrderEntity } from '../medical-order/medical-order.entity';
import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'medical_order_medication' })
export class MedicalOrderMedicationEntity {
  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'medical_order_id', type: 'uuid' })
  medicalOrderId: string;

  @Column({ name: 'medication_id', type: 'uuid' })
  medicationId: string;

  @Column({
    name: 'dose',
    type: 'varchar',
    nullable: false,
  })
  dose: string;

  @ManyToOne(() => MedicalOrderEntity, (order) => order.medicalOrderMedications)
  @JoinColumn({ name: 'medical_order_id' })
  medicalOrder: MedicalOrderEntity;

  @ManyToOne(
    () => MedicationEntity,
    (medication) => medication.medicalOrderMedications,
  )
  @JoinColumn({ name: 'medication_id' })
  medication: MedicationEntity;
}
