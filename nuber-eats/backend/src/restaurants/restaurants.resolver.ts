import {Args, Query, Resolver} from '@nestjs/graphql';
import {Restaurant} from './entities/restaurant.entities';

@Resolver(of => Restaurant)
export class RestaurantsResolver {
  @Query(returns => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }
}
