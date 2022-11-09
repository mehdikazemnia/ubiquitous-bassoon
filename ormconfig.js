/* EXTERNAL */
const dotenv = require('dotenv');
/* INTERNAL */
/* -------- */
dotenv.config();

const defaultConnection = {
	type: 'postgres',
	host: 'localhost',
	port: process.env.POSTGRES_PORT,
	username: process.env.POSTGRES_DATABASE_USERNAME,
	password: process.env.POSTGRES_DATABASE_PASSWORD,
	database:
		process.env.NODE_ENV == 'test' ? process.env.POSTGRES_TEST_DATABASE_NAME : process.env.POSTGRES_DATABASE_NAME,
	entities: ['./dist/modules/**/*.entity.js'],
	migrations: ['./dist/migrations/*.js'],
	seeds: ['./dist/seeds/initial-seed.js'],
	factories: ['./dist/seeds/product-seed.factory.js'],
	cli: {
		migrationsDir: 'src/migrations',
	},
	synchronize: true,
};

/* -EXPORT- */
module.exports = { ...defaultConnection };
/* -------- */
