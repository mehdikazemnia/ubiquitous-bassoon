/* EXTERNAL */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { UBCreated, UBOK } from '../models/ub';
/* INTERNAL */
/* -------- */

const UBApiOkResponse = <TModel extends Type<any>>(model: TModel) => {
	return applyDecorators(
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(UBOK) },
					{
						properties: {
							data: {
								type: 'object',
								$ref: getSchemaPath(model),
							},
						},
					},
				],
			},
		}),
	);
};

const UBApiCreatedResponse = <TModel extends Type<any>>(model: TModel) => {
	return applyDecorators(
		ApiCreatedResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(UBCreated) },
					{
						properties: {
							data: {
								type: 'object',
								$ref: getSchemaPath(model),
							},
						},
					},
				],
			},
		}),
	);
};

/* -EXPORT- */
export { UBApiOkResponse, UBApiCreatedResponse };
/* -------- */
