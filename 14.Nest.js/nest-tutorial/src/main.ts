import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //treba dodati za validacijo objektov (class-validator in class-transformer)
  app.useGlobalPipes(new ValidationPipe({
    //preveri da je request tocno isti kot pricakovan objekt
    whitelist: true,
    //izpise error, ce je dodano kar nebi smelo biti
    forbidNonWhitelisted: true
  }))
  await app.listen(3000);
}
bootstrap();
