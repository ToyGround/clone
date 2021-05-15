import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {RestaurantsModule} from './restaurants/restaurants.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';

console.log(process.env.DB_PORT);

@Module({
  imports    : [
    ConfigModule.forRoot({
      isGlobal     : true,
      envFilePath  : process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod'
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
