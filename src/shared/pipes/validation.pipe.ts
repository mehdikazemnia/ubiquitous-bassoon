/* EXTERNAL */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
/* INTERNAL */
import { UBBadRequest } from '../models/ub';
/* -------- */

@Injectable()
class UBValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);
		const validationErrors = await validate(object, {
			// forbidUnknownValues: true,
			forbidNonWhitelisted: true,
		});
		if (validationErrors.length > 0) {
			const transformedValidationErrors: any[] = validationErrors.map((err) => {
				return { address: err.property, message: Object.values(err.constraints)[0] };
			});
			throw new UBBadRequest(transformedValidationErrors, 'Validation Failed.');
		}
		return value;
	}

	private toValidate(metatype: any): boolean {
		const types: any[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}

/* -EXPORT- */
export { UBValidationPipe };
/* -------- */
