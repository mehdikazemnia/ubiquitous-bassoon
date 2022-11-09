/* EXTERNAL */
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';
/* INTERNAL */
/* -------- */

class ProductDto {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public title: string;

	@ApiProperty()
	public description: string;

	@ApiProperty()
	public picture: string;

	@ApiProperty()
	public price: number;

	constructor(payload: ProductEntity) {
		this.id = payload.id;
		this.title = payload.title;
		this.description = payload.description;
		this.picture = payload.picture;
		this.price = payload.price;
	}
}

/* -EXPORT- */
export { ProductDto };
/* -------- */
