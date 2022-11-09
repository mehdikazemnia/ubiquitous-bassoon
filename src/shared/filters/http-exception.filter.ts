/* EXTERNAL */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { UBBadRequest, UBNotFound, UBPanic, UBUnauthorized } from '../models/ub';
/* INTERNAL */
/* -------- */

@Catch()
class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		let suitedException;

		if (
			exception instanceof UBPanic ||
			exception instanceof UBUnauthorized ||
			exception instanceof UBBadRequest ||
			exception instanceof UBNotFound
		) {
			suitedException = exception;
		} else if (exception instanceof HttpException) {
			const status = exception.getStatus();
			if (status == 401) suitedException = new UBUnauthorized();
			else if (status >= 400) suitedException = new UBBadRequest();
			else suitedException = new UBPanic(exception);
		} else if (exception instanceof Error) {
			suitedException = new UBPanic(exception);
		} else {
			suitedException = new UBPanic(String(exception));
		}

		response.status(suitedException.meta.status).json(suitedException.response);
	}
}
/* -EXPORT- */
export { HttpExceptionFilter };
/* -------- */
