/* EXTERNAL */
import { Entity, Column, OneToMany } from 'typeorm';
/* INTERNAL */
import { BaseEntity } from '../../../shared/models/base.entity';
import { OrderProductEntity } from './order-product.entity';
/* -------- */

@Entity('orders')
class OrderEntity extends BaseEntity {
	@Column()
	public customerName!: string;

	@Column({
		type: 'timestamp',
	})
	public deliveryDate!: Date;

	/* RELATIONS */
	@OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
	public orderProducts!: OrderProductEntity[];
}

/* -EXPORT- */
export { OrderEntity };
/* -------- */
