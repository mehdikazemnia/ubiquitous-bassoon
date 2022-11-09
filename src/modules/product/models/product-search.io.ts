/* EXTERNAL */
/* INTERNAL */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { ProductSortEnum } from './product-sort.enum';
import { ProductDto } from './product.dto';
import { ProductEntity } from './product.entity';
/* -------- */

class ProductSearchInput {
	@ApiProperty({
		description: 'Your search keyword.',
		example: 'lorem',
		minLength: 3,
		maxLength: 32,
		nullable: false,
	})
	@IsString()
	@MinLength(3)
	@MaxLength(32)
	keyword: string;

	@ApiProperty({
		type: 'enum',
		enum: ProductSortEnum,
		description: 'Your preferences on sorting.',
		default: ProductSortEnum.PriceAscending,
	})
	@IsEnum(ProductSortEnum)
	sort: string;
}
class ProductSearchOutput {
	@ApiProperty({
		type: [ProductDto],
		description: 'Array of the products.',
	})
	public items: ProductDto[];

	constructor(items: ProductEntity[]) {
		this.items = items.map((item) => new ProductDto(item));
	}
}

/* -EXPORT- */
export { ProductSearchInput, ProductSearchOutput };
/* -------- */
