import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Restaurant} from './entities/restaurant.entities';
import {restaurantDto} from './dtos/restaurant.dto';
import {RestaurantsService} from './restaurants.service';

@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantsService) {
  }

  @Query(returns => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation(returns => Boolean)
  createRestaurant(@Args() restaurantDto: restaurantDto): boolean {
    return true;
  };
}
