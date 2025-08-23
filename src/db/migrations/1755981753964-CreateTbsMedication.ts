import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbsMedication1755981753964 implements MigrationInterface {
  name = 'CreateTbsMedication1755981753964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medication" (
                "medication_id" uuid NOT NULL, 
                "name" character varying NOT NULL, 
                "description" text NOT NULL, 
                "diseases" text NOT NULL, 
                CONSTRAINT "PK_5718ed35893e651f8b09071711d" PRIMARY KEY ("medication_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "medical_order_medication" (
                "id" uuid NOT NULL,
                "dose" character varying NOT NULL, 
                "medical_order_id" uuid, 
                "medication_id" uuid, 
                CONSTRAINT "PK_39bfb23597d6481e608d23a86a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_order_medication" ADD CONSTRAINT "FK_a83f0c0e85feaffb8a43af2190a" FOREIGN KEY ("medical_order_id") REFERENCES "medical_order"("medical_order_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_order_medication" ADD CONSTRAINT "FK_57a57eb0f12bd457adcdf43c4f1" FOREIGN KEY ("medication_id") REFERENCES "medication"("medication_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_order_medication" DROP CONSTRAINT "FK_57a57eb0f12bd457adcdf43c4f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_order_medication" DROP CONSTRAINT "FK_a83f0c0e85feaffb8a43af2190a"`,
    );
    await queryRunner.query(`DROP TABLE "medical_order_medication"`);
    await queryRunner.query(`DROP TABLE "medication"`);
  }
}
