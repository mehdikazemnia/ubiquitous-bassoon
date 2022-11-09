/* EXTERNAL */
import { ApiProperty } from '@nestjs/swagger';
/* INTERNAL */
import { ArrayNotEmpty, IsArray, IsDateString, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseCreateOutput } from '../../../shared/models/common.io';
/* -------- */

class OrderSubmitInput {
	@ApiProperty({
		description: 'Customer Name.',
		example: 'John Doe',
		minLength: 3,
		maxLength: 32,
		nullable: false,
	})
	@IsString()
	@MinLength(3)
	@MaxLength(32)
	public customerName: string;

	@ApiProperty({
		type: Date,
		description: 'The date in which you wish to receive the products.',
		nullable: false,
	})
	@IsDateString()
	public deliveryDate: Date;

	@ApiProperty({
		type: Array,
		description: 'Array of the product ids you wish to order.',
		example: [1, 2, 3],
		minLength: 1,
		isArray: true,
		maxLength: 10,
		nullable: false,
	})
	@IsArray()
	@ArrayNotEmpty()
	public productIds: Array<number>;
}
class OrderSubmitOutput extends BaseCreateOutput {
	@ApiProperty({
		type: Number,
		description: 'Sum Price of the goods you ordered.',
	})
	public sumPrice: number;

	constructor(payload: Pick<BaseCreateOutput, 'id'>, sumPrice: number) {
		super(payload);
		this.sumPrice = sumPrice;
	}
}

/* -EXPORT- */
export { OrderSubmitInput, OrderSubmitOutput };
/* -------- */
