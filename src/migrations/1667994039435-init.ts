import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1667994039435 implements MigrationInterface {
	name = 'init1667994039435';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, "picture" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(`CREATE INDEX "IDX_c30f00a871de74c8e8c213acc4" ON "products" ("title") `);
		await queryRunner.query(`CREATE INDEX "IDX_433f0ea20c848a3c0421c7d245" ON "products" ("description") `);
		await queryRunner.query(`CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price") `);
		await queryRunner.query(
			`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "customerName" character varying NOT NULL, "deliveryDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "order-product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "orderId" integer NOT NULL, "productId" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_6d463631a057f91ce0ccb66693a" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "order-product" ADD CONSTRAINT "FK_ddbf968a6fa276f364f1d52a3fb" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "order-product" ADD CONSTRAINT "FK_9c977b466fdb4f503740b4de1cc" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "order-product" DROP CONSTRAINT "FK_9c977b466fdb4f503740b4de1cc"`);
		await queryRunner.query(`ALTER TABLE "order-product" DROP CONSTRAINT "FK_ddbf968a6fa276f364f1d52a3fb"`);
		await queryRunner.query(`DROP TABLE "order-product"`);
		await queryRunner.query(`DROP TABLE "orders"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_75895eeb1903f8a17816dafe0a"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_433f0ea20c848a3c0421c7d245"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_c30f00a871de74c8e8c213acc4"`);
		await queryRunner.query(`DROP TABLE "products"`);
	}
}
