/* EXTERNAL */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/* INTERNAL */
import { AppModule } from './app.module';
import { UBValidationPipe } from './shared/pipes/validation.pipe';
/* -------- */

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// global pipes
	app.useGlobalPipes(new UBValidationPipe());

	// Swagger
	const config = new DocumentBuilder()
		.setTitle('Ubiquitous Bassoon API Service')
		.setDescription('Ubiquitous Bassoon API Service, API documents.')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document);

	await app.listen(3000);
}
bootstrap();

/* -EXPORT- */
/* -------- */
