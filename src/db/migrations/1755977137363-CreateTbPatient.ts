import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbPatient1755977137363 implements MigrationInterface {
  name = 'CreateTbPatient1755977137363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patient" (
                "patient_id" uuid NOT NULL, 
                "id" character varying(20) NOT NULL, 
                "first_name" character varying(90) NOT NULL, 
                "last_name" character varying(90) NOT NULL, 
                "email" character varying(200) NOT NULL, 
                "phone" character varying(20) NOT NULL, 
                "address" character varying(200) NOT NULL, 
                "city" character varying(90) NOT NULL, 
                CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05" PRIMARY KEY ("patient_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "patient"`);
  }
}
