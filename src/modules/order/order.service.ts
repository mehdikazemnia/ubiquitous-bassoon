/* EXTERNAL */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { OrderProductEntity } from './models/order-product.entity';
/* INTERNAL */
import { OrderSubmitInput, OrderSubmitOutput } from './models/order-submit.io';
import { OrderEntity } from './models/order.entity';
/* -------- */

@Injectable()
class OrderService {
	constructor(
		@Inject(forwardRef(() => ProductService))
		private readonly productService: ProductService,
		@InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
		@InjectRepository(OrderProductEntity) private orderProductRepository: Repository<OrderProductEntity>,
	) {}

	public async createOne(orderObject: OrderSubmitInput): Promise<OrderEntity & { sumPrice: number }> {
		const preparedOrder: Partial<OrderEntity> = orderObject;
		const newOrder = await this.orderRepository.create(preparedOrder);
		await this.orderRepository.save(newOrder);

		let sumPrice = 0;
		const products = await this.productService.getMany(orderObject.productIds);
		const preparedOrderProducts: Partial<OrderProductEntity>[] = products.map((product) => {
			sumPrice += product.price;
			return {
				orderId: +newOrder.id,
				productId: +product.id,
				price: +product.price,
			};
		});

		await this.orderProductRepository.insert(preparedOrderProducts);

		return { ...newOrder, sumPrice };
	}

	/*   API    */

	public async $submit(payload: OrderSubmitInput): Promise<OrderSubmitOutput> {
		const createResult = await this.createOne(payload);
		return new OrderSubmitOutput({ id: createResult.id }, createResult.sumPrice);
	}
}

/* -EXPORT- */
export { OrderService };
/* -------- */
