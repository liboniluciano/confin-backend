import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTransactions1601165363032 implements MigrationInterface {
    name = 'createUserTransactions1601165363032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_transactions" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_transactions" DROP COLUMN "name"`);
    }

}
