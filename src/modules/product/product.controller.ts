/* EXTERNAL */
import { Controller, Post, Body, UseFilters, HttpCode } from '@nestjs/common';
import { ApiBadRequestResponse, ApiExtraModels, ApiTags } from '@nestjs/swagger';
/* INTERNAL */
import { UBApiOkResponse } from '../../shared/decorators/output.decorator';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { UBBadRequest, UBOK } from '../../shared/models/ub';
import { ProductSearchInput, ProductSearchOutput } from './models/product-search.io';
import { ProductService } from './product.service';
/* -------- */

@Controller('product')
@ApiTags('product')
@UseFilters(new HttpExceptionFilter())
@ApiBadRequestResponse({ type: UBBadRequest })
@ApiExtraModels(UBOK, ProductSearchOutput)
class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('search')
	@HttpCode(200)
	@UBApiOkResponse(ProductSearchOutput)
	public async search(@Body() body: ProductSearchInput) {
		const output = await this.productService.$search(body);
		return new UBOK<ProductSearchOutput>(output);
	}
}
/* -EXPORT- */
export { ProductController };
/* -------- */
