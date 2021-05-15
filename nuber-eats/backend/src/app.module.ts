import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {RestaurantsModule} from './restaurants/restaurants.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';

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
      port       : 5432,
      username   : 'jjun',
      password   : '8216',
      database   : 'nuber-eats',
      synchronize: true,
      logging    : false
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
