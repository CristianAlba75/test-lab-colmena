import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnMedication1756066910878 implements MigrationInterface {
  name = 'AlterColumnMedication1756066910878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "medication" DROP COLUMN "diseases"`);
    await queryRunner.query(
      `ALTER TABLE "medication" ADD "diseases" text array NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "medication" DROP COLUMN "diseases"`);
    await queryRunner.query(
      `ALTER TABLE "medication" ADD "diseases" text NOT NULL`,
    );
  }
}
