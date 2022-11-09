/* EXTERNAL */
import { registerAs } from '@nestjs/config';
/* INTERNAL */
/* -------- */

const apiConfig = registerAs('api', () => ({
	env: process.env.NODE_ENV,
	host: process.env.API_HOST,
	port: process.env.API_PORT,
	basePath: process.env.API_PATH,
}));

/* -EXPORT- */
export default apiConfig;
/* -------- */
