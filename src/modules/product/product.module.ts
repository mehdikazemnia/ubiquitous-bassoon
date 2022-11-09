/* EXTERNAL */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* INTERNAL */
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './models/product.entity';
/* -------- */

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity])],
	controllers: [ProductController],
	providers: [ProductService],
})
class ProductModule {}

/* -EXPORT- */
export { ProductModule };
/* -------- */
