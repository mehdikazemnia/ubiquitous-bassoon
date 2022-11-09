/* EXTERNAL */
import { ApiProperty } from '@nestjs/swagger';
/* INTERNAL */
import { OrderEntity } from './order.entity';
/* -------- */

class OrderDetailDto {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public customerName: string;

	@ApiProperty()
	public deliveryDate: Date;

	@ApiProperty()
	public productIds: Array<string>;

	@ApiProperty()
	public price: number;

	constructor(payload: OrderEntity & { price: number }) {
		this.id = payload.id;
		this.customerName = payload.customerName;
		this.deliveryDate = payload.deliveryDate;
		this.productIds = payload.orderProducts.map((op) => op.id);
		this.price = payload.price;
	}
}

/* -EXPORT- */
export { OrderDetailDto };
/* -------- */
