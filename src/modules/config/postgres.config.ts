/* EXTERNAL */
import { registerAs } from '@nestjs/config';
/* INTERNAL */
/* -------- */

const postgresConfig = registerAs('postgres', () => {
	return {
		host: process.env.POSTGRES_HOST,
		port: parseInt(process.env.POSTGRES_PORT),
		username: process.env.POSTGRES_USERNAME,
		password: process.env.POSTGRES_PASSWORD,
		databaseName:
			process.env.NODE_ENV == 'test'
				? process.env.POSTGRES_TEST_DATABASE_NAME
				: process.env.POSTGRES_DATABASE_NAME,
		databaseUsername: process.env.POSTGRES_DATABASE_USERNAME,
		databasePassword: process.env.POSTGRES_DATABASE_PASSWORD,
		synchronize: process.env.POSTGRES_SYNCHRONIZE,
		logging: process.env.POSTGRES_LOGGING,
		entities: process.env.POSTGRES_ENTITIES,
		migration: process.env.POSTGRES_MIGRATIONS,
		subscribers: process.env.POSTGRES_SUBSCRIBERS,
	};
});

/* -EXPORT- */
export default postgresConfig;
/* -------- */
