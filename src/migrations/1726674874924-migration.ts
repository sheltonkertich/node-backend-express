import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726674874924 implements MigrationInterface {
    name = 'Migration1726674874924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "emaill"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "emaill" TO "email"`);
    }

}
