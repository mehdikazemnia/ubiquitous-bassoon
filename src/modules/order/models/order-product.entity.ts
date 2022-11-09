/* EXTERNAL */
import { Entity, Column, ManyToOne } from 'typeorm';
/* INTERNAL */
import { BaseEntity } from '../../../shared/models/base.entity';
import { ProductEntity } from '../../product/models/product.entity';
import { OrderEntity } from './order.entity';
/* -------- */

@Entity('order-product')
class OrderProductEntity extends BaseEntity {
	@Column()
	public orderId!: number;

	@Column()
	public productId!: number;

	@Column()
	public price!: number;

	/* RELATIONS */

	@ManyToOne(() => ProductEntity, (product) => product.orderProducts)
	public product!: ProductEntity;

	@ManyToOne(() => OrderEntity, (order) => order.orderProducts)
	public order!: OrderEntity;
}

/* -EXPORT- */
export { OrderProductEntity };
/* -------- */
