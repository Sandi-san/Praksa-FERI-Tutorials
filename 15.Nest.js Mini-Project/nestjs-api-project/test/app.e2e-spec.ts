import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { PrismaService } from "../src/prisma/prisma.service"
import * as pactum from 'pactum'
import { AuthDto } from "src/auth/dto"

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    //ustvari testing module
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }),);
    //init server
    await app.init()
    //start server
    await app.listen(3333)

    //clean DB
    prisma = app.get(PrismaService)
    await prisma.cleanDB()
    pactum.request.setBaseUrl('http://localhost:3001')
  })
  //ko so vsi testi done
  afterAll(() => {
    app.close()
  })

  //testiraj DB
  describe('Auth', () => {
    //nastavi parametre (body in pot) za test in pozeni
    const dto: AuthDto = {
      email: "jurcek@email.com",
      password: "123"
    }

    describe('Signup', () => {
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400)
      })
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signup').withBody({
          password: dto.password
        }).expectStatus(400)
      })
      it('should throw if password empty', () => {
        return pactum.spec().post('/auth/signup').withBody({
          email: dto.email
        }).expectStatus(400)
      })

      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201)
      })

      describe('Signin', () => {
        it('should throw if no body provided', () => {
          return pactum.spec().post('/auth/signin').expectStatus(400)
        })
        it('should throw if email empty', () => {
          return pactum.spec().post('/auth/signin').withBody({
            password: dto.password
          }).expectStatus(400)
        })
        it('should throw if password empty', () => {
          return pactum.spec().post('/auth/signin').withBody({
            email: dto.email
          }).expectStatus(400)
        })

        it('should signin', () => {
          return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200)
            .stores('userAt', 'access_token')
          //shrani access_token iz body-a (uporabi v user request)
        })
      })
    })
  })
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum.spec().get('/users/me').withHeaders({
          Authorization: 'Bearer $S{userAt}'
        }).expectStatus(200)
      })
    })
    describe('Edit user', () => {

    })
  })
  describe('Bookmarks', () => {
    describe('Create bookmark', () => {

    })
    describe('Get bookmarks', () => {

    })
    describe('Get bookmark by id', () => {

    })
    describe('Edit bookmark by id', () => {

    })
    describe('Delete bookmark by id', () => {

    })
  })
})