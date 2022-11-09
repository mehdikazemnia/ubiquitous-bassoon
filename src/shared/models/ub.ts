/* EXTERNAL */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
/* INTERNAL */
/* -------- */

class UBError {
	@ApiProperty()
	address: string = null;
	@ApiProperty()
	message: string = null;
	constructor(address: string, message: string) {
		this.address = address;
		this.message = message;
	}
}

class UBMeta {
	@ApiProperty({
		type: 'enum',
		enum: Object.keys(HttpStatus)
			.filter((k) => !Number.isNaN(parseInt(k)))
			.map((k) => Number(k)),
	})
	status: HttpStatus;
	@ApiProperty()
	message: string = null;
	@ApiProperty({ type: [UBError], required: false })
	errors: UBError[] = null;
	constructor(status: HttpStatus, message: string, errors: UBError[]) {
		this.status = status;
		this.message = message;
		this.errors = errors;
	}
}

interface UBInterface<DataType> {
	meta: UBMeta;
	data?: DataType;
}

class UBOK<DataType> implements UBInterface<DataType> {
	@ApiProperty({
		example: {
			errors: null,
			message: 'OK.',
			status: HttpStatus.OK,
		},
	})
	meta: UBMeta = {
		errors: null,
		message: 'OK.',
		status: HttpStatus.OK,
	};
	data: DataType;

	constructor(data?: DataType, message?: string) {
		if (message) this.meta.message = message;
		if (data) this.data = data;
	}
}

class UBCreated<DataType> implements UBInterface<DataType> {
	@ApiProperty({
		example: {
			errors: null,
			message: 'Created.',
			status: HttpStatus.CREATED,
		},
	})
	meta: UBMeta = {
		errors: null,
		message: 'Created.',
		status: HttpStatus.CREATED,
	};
	data: DataType;

	constructor(data?: DataType, message?: string) {
		if (data) this.data = data;
		if (message) this.meta.message = message;
	}
}

class UB500Range extends HttpException implements UBInterface<any> {
	@ApiProperty({
		example: {
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'Internal Server Error.',
			errors: null,
		},
	})
	meta: UBMeta;
	@ApiProperty()
	data: any;
	constructor(defaultMessage: string, statusCode: HttpStatus, error: string | Error) {
		let stdErr;
		if (typeof error == 'string') {
			stdErr = new Error(error);
		} else {
			stdErr = error;
		}
		const meta: UBMeta = {
			status: statusCode,
			message: stdErr.message || defaultMessage,
			errors: null,
		};
		super({ meta, data: null }, meta.status);
		this.meta = meta;
	}
}

class UBInternalServerError extends UB500Range {
	constructor(error?: string | Error) {
		super('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR, error);
	}
}

class UBPanic extends UB500Range {
	constructor(error?: string | Error) {
		super('Expected Panic.', HttpStatus.INTERNAL_SERVER_ERROR, error);
	}
}

class UB400Range extends HttpException implements UBInterface<any> {
	@ApiProperty({
		example: {
			status: HttpStatus.BAD_REQUEST,
			message: 'Bad Request.',
			errors: null,
		},
	})
	meta: UBMeta;
	@ApiProperty()
	data: any;
	constructor(defaultMessage: string, statusCode: HttpStatus, error?: UBError[] | string, message?: string) {
		let errors = [];
		if (Array.isArray(error)) {
			errors = error.map((e) => new UBError(e.address, e.message));
		} else if (!!error && typeof error == 'string') {
			if (!message) {
				message = error;
			} else {
				// TODO: fail miserably, shouldn't use both error and message as strings
			}
		}
		const meta: UBMeta = {
			status: statusCode,
			message: message || defaultMessage,
			errors: errors,
		};
		super({ meta, data: null }, meta.status);
		this.meta = meta;
	}
}

class UBBadRequest extends UB400Range {
	constructor(error?: UBError[] | string, message?: string) {
		super('Bad Request.', HttpStatus.BAD_REQUEST, error, message);
	}
}

class UBNotFound extends UB400Range {
	constructor(error?: UBError[] | string, message?: string) {
		super('Not Found.', HttpStatus.NOT_FOUND, error, message);
	}
}

class UBUnauthorized extends UB400Range {
	constructor(error?: UBError[] | string, message?: string) {
		super('Unauthorized.', HttpStatus.UNAUTHORIZED, error, message);
	}
}

/* -EXPORT- */
export {
	/* 200-299 */
	UBOK as UBOK,
	UBCreated as UBCreated,
	/* 400-499 */
	UBBadRequest as UBBadRequest,
	UBNotFound as UBNotFound,
	UBUnauthorized as UBUnauthorized,
	/* 500-599 */
	UBPanic as UBPanic,
	UBInternalServerError as UBInternalServerError,
};
/* -------- */
