import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { ProductEntity } from '../modules/product/models/product.entity';

define(ProductEntity, () => {
	const product = new ProductEntity();
	product.title = faker.lorem.words(4);
	product.description = faker.lorem.paragraphs(2);
	product.picture = faker.image.abstract();
	product.price = 10 + Math.round(Math.random() * 10);
	return product;
});
