import {Injectable} from '@nestjs/common';
import {Restaurant} from './entities/restaurant.entities';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {createRestaurantDto} from './dtos/create-restaurant.dto';


@Injectable()
export class RestaurantsService {
  constructor(@InjectRepository(Restaurant) private readonly restaurants: Repository<Restaurant>) {
  }

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  createRestaurant(createRestaurantDto: createRestaurantDto): Promise<Restaurant> {
    /**
     * 공식 제공 문서
     * const newRestaurant = new Restaurant()
     * newRestaurant.name = createRestaurantDto.name
     * ...
     * 이런식으로 정의하는데, TypeORM에서는 아래와 같이 create() 메소드를 제공해준다.
     const newRestaurant = this.restaurants.create({
        name     : createRestaurantDto.name,
        isVegan  : createRestaurantDto.isVegan,
        address  : createRestaurantDto.address,z
        ownerName: createRestaurantDto.ownerName
      });

     TypeScript 에서는 이미 타입이 정의되어있으니 createRestaurantDto 가 어떤 객체가 담겨있는지 알 수 있다.
     * */
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }
}
