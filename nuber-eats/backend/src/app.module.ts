import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {RestaurantsModule} from './restaurants/restaurants.module';
import * as Joi from 'joi';

@Module({
  imports    : [
    ConfigModule.forRoot({
      isGlobal        : true,
      envFilePath     : process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile   : process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod')
      })
    }),
    TypeOrmModule.forRoot({
      type       : 'postgres',
      host       : 'localhost',
      port       : +process.env.DB_PORT,
      username   : process.env.DB_USERNAME,
      password   : process.env.DB_PASSWORD,
      database   : process.env.DB_NAME,
      synchronize: true,
      logging    : true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    RestaurantsModule
  ],
  controllers: [],
  providers  : [],
})
export class AppModule {
}
