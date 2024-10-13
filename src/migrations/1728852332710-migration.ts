import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728852332710 implements MigrationInterface {
    name = 'Migration1728852332710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_likes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_likes" DROP COLUMN "createdAt"`);
    }

}
