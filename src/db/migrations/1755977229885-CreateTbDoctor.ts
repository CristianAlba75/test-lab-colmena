import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTbDoctor1755977229885 implements MigrationInterface {
  name = 'CreateTbDoctor1755977229885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "doctor" (
                "doctor_id" uuid NOT NULL, 
                "id" character varying(20) NOT NULL, 
                "professional_card" character varying(20) NOT NULL, 
                "first_name" character varying(90) NOT NULL, 
                "last_name" character varying(90) NOT NULL, 
                "email" character varying(200) NOT NULL, 
                "phone" character varying(20) NOT NULL, 
                "address" character varying(200) NOT NULL, 
                "city" character varying(90) NOT NULL, 
                "admission_date" date NOT NULL, 
                CONSTRAINT "PK_e2959c517497025482609c0166c" PRIMARY KEY ("doctor_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "doctor"`);
  }
}
