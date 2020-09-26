import {MigrationInterface, QueryRunner} from "typeorm";

export class createTypesTransactions1601159955507 implements MigrationInterface {
    name = 'createTypesTransactions1601159955507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "types_transactions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bc59d9fdda9b595167dff63b80c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "types_transactions"`);
    }

}
