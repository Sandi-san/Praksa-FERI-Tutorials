import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import express from 'express'
import Logging from 'library/Logging'

import { AppModule } from './modules/app.module'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.enableCors({
    //react = port 3000
    origin: ['http://localhost:3000'],
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser()) //cookies visible na client side
  //Setup to display files (shranjevanje slik v root)
  app.use('/files', express.static('files'))

  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Nest.js Tutorial API')
    .setDescription('This is the API for Nest.js Tutorial')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document) //root, localhost 8080

  const PORT = process.env.PORT || 8080
  await app.listen(PORT)

  Logging.log(`App is listening on port: ${await app.getUrl()}`)
}
bootstrap()
