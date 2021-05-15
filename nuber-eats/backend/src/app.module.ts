import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {RestaurantsModule} from './restaurants/restaurants.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports    : [
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
