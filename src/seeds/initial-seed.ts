/* EXTERNAL */
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ProductEntity } from '../modules/product/models/product.entity';
/* INTERNAL */
/* -------- */

class InitialDatabaseSeed implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		console.log(connection);
		await factory(ProductEntity)().createMany(15);
	}
}

/* -EXPORT- */
export { InitialDatabaseSeed };
/* -------- */
