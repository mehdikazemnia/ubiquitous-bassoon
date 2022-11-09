/* EXTERNAL */
import { Entity, Column, OneToMany, Index } from 'typeorm';
/* INTERNAL */
import { BaseEntity } from '../../../shared/models/base.entity';
import { OrderProductEntity } from '../../order/models/order-product.entity';
/* -------- */

@Entity('products')
class ProductEntity extends BaseEntity {
	@Column()
	@Index({ fulltext: true })
	public title!: string;

	@Column()
	@Index({ fulltext: true })
	public description!: string;

	@Column()
	public picture!: string;

	@Index()
	@Column()
	public price!: number;

	/* RELATIONS */
	@OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
	public orderProducts!: OrderProductEntity[];
}

/* -EXPORT- */
export { ProductEntity };
/* -------- */
