/* EXTERNAL */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import apiConfig from './modules/config/api.config';
import postgresConfig from './modules/config/postgres.config';
/* INTERNAL */
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
/* -------- */

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			load: [postgresConfig, apiConfig],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				host: 'localhost',
				port: configService.get('postgres.port'),
				username: configService.get('postgres.databaseUsername'),
				password: configService.get('postgres.databasePassword'),
				database: configService.get('postgres.databaseName'),
				autoLoadEntities: true,
				logging: true,
			}),
		}),
		ProductModule,
		OrderModule,
	],
	controllers: [],
	providers: [],
})
class AppModule {}

/* -EXPORT- */
export { AppModule };
/* -------- */
