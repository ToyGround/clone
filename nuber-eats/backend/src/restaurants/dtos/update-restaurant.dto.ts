import {ArgsType, Field, InputType, PartialType} from '@nestjs/graphql';
import {createRestaurantDto} from './create-restaurant.dto';

@InputType()
class UpdateRestaurantInputType extends PartialType(createRestaurantDto) {
}

@InputType()
export class UpdateRestaurantDto {
  @Field(returns => Number)
  id: number;

  @Field(returns => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
