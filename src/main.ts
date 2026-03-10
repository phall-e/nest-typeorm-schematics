import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map(err => ({
          field: err.property,
          errors: Object.values(err.constraints ?? {}),
        }));

        return new UnprocessableEntityException({
          message: 'Unexceptable Entity',
          statusCode: 422,
          errors: formattedErrors,
        });
      },
    }),
  );
  app.setGlobalPrefix(`${process.env.API_PREFIX}/${process.env.API_VERSION}`);
  app.enableCors();
  await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
