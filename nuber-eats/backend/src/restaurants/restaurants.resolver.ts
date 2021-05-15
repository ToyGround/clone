import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Restaurant} from './entities/restaurant.entities';
import {createRestaurantDto} from './dtos/create-restaurant.dto';
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
  async createRestaurant(@Args('input') createRestaurantDto: createRestaurantDto): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
