import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726723281514 implements MigrationInterface {
    name = 'Migration1726723281514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

}
