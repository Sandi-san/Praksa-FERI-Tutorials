import { NestFactory } from '@nestjs/core'

import { AppModule } from './modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import express from 'express'
import Logging from 'library/Logging'

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

  const PORT = process.env.PORT || 8080
  await app.listen(PORT)

  Logging.log(`App is listening on port: ${await app.getUrl()}`)
}
bootstrap()
