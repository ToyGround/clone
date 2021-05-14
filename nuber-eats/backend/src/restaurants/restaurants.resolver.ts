import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Restaurant} from './entities/restaurant.entities';
import {restaurantDto} from './dtos/restaurant.dto';

@Resolver(of => Restaurant)
export class RestaurantsResolver {
  @Query(returns => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }

  @Mutation(returns => Boolean)
  createRestaurant(@Args() restaurantDto: restaurantDto): boolean {
    return true;
  };
}
