/* EXTERNAL */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
import { getManager /* Repository */, Repository } from 'typeorm';
/* INTERNAL */
import { ProductSearchInput, ProductSearchOutput } from './models/product-search.io';
import { ProductEntity } from './models/product.entity';
/* -------- */

@Injectable()
class ProductService {
	constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) {}

	public async getMany(input: Array<number>): Promise<ProductEntity[]> {
		const products = await this.productRepository.findByIds(input);
		return products;
	}

	public async search(input: ProductSearchInput): Promise<ProductEntity[]> {
		const formattedQuery = input.keyword.trim().replace(/ /g, ' & ');
		const products = await getManager()
			.createQueryBuilder()
			.select('product')
			.from(ProductEntity, 'product')
			.where(`to_tsvector('simple',product.title) @@ to_tsquery('simple', :query)`, {
				query: `${formattedQuery}:*`,
			})
			.orWhere(`to_tsvector('simple',product.description) @@ to_tsquery('simple', :query)`, {
				query: `${formattedQuery}:*`,
			})
			.getMany();
		return products;
	}

	public async $search(input: ProductSearchInput): Promise<ProductSearchOutput> {
		const products = await this.search(input);
		return new ProductSearchOutput(products);
	}
}

/* -EXPORT- */
export { ProductService };
/* -------- */
