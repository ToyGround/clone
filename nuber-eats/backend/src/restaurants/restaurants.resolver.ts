import {Query, Resolver} from '@nestjs/graphql';

@Resolver()
export class RestaurantsResolver {
  @Query(returns => Boolean)
  isTest(): Boolean {
    return true;
  };
}