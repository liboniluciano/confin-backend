import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsersTransactions1601323380104 implements MigrationInterface {
    name = 'createUsersTransactions1601323380104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_transactions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" integer NOT NULL, "user_id" integer, "typeTransaction_id" integer, CONSTRAINT "PK_fb9a1da696b17ab6c3ce75b6c7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_transactions" ADD CONSTRAINT "FK_40be88ece0adad0afd4d1d58ae4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_transactions" ADD CONSTRAINT "FK_39e12504441a4f8caa2381f8ced" FOREIGN KEY ("typeTransaction_id") REFERENCES "types_transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_transactions" DROP CONSTRAINT "FK_39e12504441a4f8caa2381f8ced"`);
        await queryRunner.query(`ALTER TABLE "users_transactions" DROP CONSTRAINT "FK_40be88ece0adad0afd4d1d58ae4"`);
        await queryRunner.query(`DROP TABLE "users_transactions"`);
    }

}
