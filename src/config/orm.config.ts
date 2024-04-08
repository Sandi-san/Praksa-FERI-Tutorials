import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

//intersect dveh type
type ConfigType = TypeOrmModuleOptions & PostgresConnectionOptions
type ConnectionOptions = ConfigType

export const ORMConfig = async (configService: ConfigService): Promise<ConnectionOptions> => ({
  type: 'postgres',
  //iz .env.development
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PWD'),
  database: configService.get('DATABASE_NAME'),
  //vkljuci vsak ".entity.ts" file
  // entities: ['dist/**/*.entity.ts'],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, //sinhroniziraj bazo LE V DEVELOPMENT

  //CHANGE: Ker mi na localhost ne dela otherwise
  ssl: false,
  // extra: {
  //     ssl: {
  //         rejectUnauthorized: false,
  //     }
  // }
})
