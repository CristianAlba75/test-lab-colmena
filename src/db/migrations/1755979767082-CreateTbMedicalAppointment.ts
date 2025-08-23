import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbMedicalAppointment1755979767082
  implements MigrationInterface
{
  name = 'CreateTbMedicalAppointment1755979767082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medical_appointment" (
                "medical_appointment_id" uuid NOT NULL, 
                "appointment_date" TIMESTAMP WITH TIME ZONE NOT NULL, 
                "status" character varying NOT NULL, 
                "date_update_status" TIMESTAMP WITH TIME ZONE, 
                "doctor_id" uuid, 
                "patient_id" uuid, 
                CONSTRAINT "PK_9696d2714bbaba2f87e5e1ff76b" PRIMARY KEY ("medical_appointment_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointment" ADD CONSTRAINT "FK_936e6f164840c1f83a8734f5c2b" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("doctor_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointment" ADD CONSTRAINT "FK_a8105dac8a2f8caaca21010aac2" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_appointment" DROP CONSTRAINT "FK_a8105dac8a2f8caaca21010aac2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_appointment" DROP CONSTRAINT "FK_936e6f164840c1f83a8734f5c2b"`,
    );
    await queryRunner.query(`DROP TABLE "medical_appointment"`);
  }
}
