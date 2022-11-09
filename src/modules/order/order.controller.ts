/* EXTERNAL */
import { Controller, Post, Body, UseFilters, HttpCode } from '@nestjs/common';
import { ApiBadRequestResponse, ApiExtraModels, ApiTags } from '@nestjs/swagger';
/* INTERNAL */
import { UBApiCreatedResponse } from '../../shared/decorators/output.decorator';
import { HttpExceptionFilter } from '../../shared/filters/http-exception.filter';
import { UBBadRequest, UBCreated, UBOK } from '../../shared/models/ub';
import { OrderService } from './order.service';
import { OrderSubmitInput, OrderSubmitOutput } from './models/order-submit.io';
/* -------- */

@Controller('order')
@ApiTags('order')
@UseFilters(new HttpExceptionFilter())
@ApiBadRequestResponse({ type: UBBadRequest })
@ApiExtraModels(UBOK, OrderSubmitOutput, UBCreated)
class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post('submit')
	@HttpCode(201)
	@UBApiCreatedResponse(OrderSubmitOutput)
	public async submit(@Body() body: OrderSubmitInput) {
		const output = await this.orderService.$submit(body);
		return new UBCreated<OrderSubmitOutput>(output);
	}
}

/* -EXPORT- */
export { OrderController };
/* -------- */
