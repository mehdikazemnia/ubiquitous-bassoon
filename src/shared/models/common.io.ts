/* EXTERNAL */
import { ApiProperty } from '@nestjs/swagger';
/* INTERNAL */
/* -------- */

class BaseCreateOutput {
	@ApiProperty({
		type: 'string',
		nullable: false,
	})
	id: string;

	constructor(payload: Pick<BaseCreateOutput, 'id'>) {
		this.id = payload.id;
	}
}

/* -EXPORT- */
export { BaseCreateOutput };
/* -------- */
