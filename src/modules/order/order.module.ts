/* EXTERNAL */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* INTERNAL */
import { OrderEntity } from './models/order.entity';
import { OrderProductEntity } from './models/order-product.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { ProductEntity } from '../product/models/product.entity';
/* -------- */

@Module({
	imports: [
		TypeOrmModule.forFeature([OrderEntity]),
		TypeOrmModule.forFeature([OrderProductEntity]),
		TypeOrmModule.forFeature([ProductEntity]),
		ProductModule,
	],
	controllers: [OrderController],
	providers: [OrderService, ProductService],
})
class OrderModule {}

/* -EXPORT- */
export { OrderModule };
/* -------- */
