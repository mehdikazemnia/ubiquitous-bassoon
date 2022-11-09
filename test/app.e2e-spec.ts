/* EXTERNAL */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, LoggerService } from '@nestjs/common';
import * as request from 'supertest';
/* INTERNAL */
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';
import { ProductEntity } from '../src/modules/product/models/product.entity';
import { OrderEntity } from '../src/modules/order/models/order.entity';
import { OrderProductEntity } from '../src/modules/order/models/order-product.entity';
/* -------- */

class TestLogger implements LoggerService {
	log(message: string) {
		console.log(message);
	}
	error(message: string, trace: string) {
		console.log(message, trace);
	}
	warn(message: string) {
		console.log(message);
	}
	debug(message: string) {
		console.log(message);
	}
	verbose(message: string) {
		console.log(message);
	}
}

describe('Main functionality (e2e)', () => {
	let app: INestApplication;
	let connection: Connection;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useLogger(new TestLogger());
		await app.init();

		connection = app.get(Connection);
	});

	afterAll(async () => {
		await connection.manager.createQueryBuilder().delete().from(OrderProductEntity).execute();
		await connection.manager.createQueryBuilder().delete().from(OrderEntity).execute();
		await connection.manager.createQueryBuilder().delete().from(ProductEntity).execute();
		await Promise.all([app.close()]);
	});

	describe('ProductModule', () => {
		it('searches through products using the keyword', async () => {
			const response = await request(app.getHttpServer())
				.post('/product/search')
				.send({
					keyword: 'red',
					sort: 'PriceAscending',
				})
				.expect(200);
			console.log(response.body);
		});
	});

	describe('OrderModule', () => {
		it('submits an order successfully', async () => {
			const response = await request(app.getHttpServer())
				.post('/order/submit')
				.send({
					customerName: 'Test Toast',
					deliveryDate: new Date(),
					productIds: [1, 2, 3],
				})
				.expect(201);
			console.log(response.body);
		});
	});
});
/* -EXPORT- */
// export default init;
/* -------- */
