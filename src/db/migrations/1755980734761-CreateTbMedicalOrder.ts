import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbMedicalOrder1755980734761 implements MigrationInterface {
  name = 'CreateTbMedicalOrder1755980734761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medical_order" (
                "medical_order_id" uuid NOT NULL, 
                "description" character varying NOT NULL, 
                "expiration_date" TIMESTAMP WITH TIME ZONE NOT NULL, 
                "speciality" character varying NOT NULL, 
                "medical_appointment_id" uuid, 
                CONSTRAINT "PK_f9d8f64d75d058726ee5b8c7bd9" PRIMARY KEY ("medical_order_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_order" ADD CONSTRAINT "FK_7453e01d340231278d1a6c25555" FOREIGN KEY ("medical_appointment_id") REFERENCES "medical_appointment"("medical_appointment_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_order" DROP CONSTRAINT "FK_7453e01d340231278d1a6c25555"`,
    );
    await queryRunner.query(`DROP TABLE "medical_order"`);
  }
}
