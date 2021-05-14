import {ArgsType, Field} from '@nestjs/graphql';

@ArgsType()
export class restaurantDto {
  @Field(returns => String)
  name: string;

  @Field(returns => Boolean)
  isVegan: boolean;

  @Field(returns => String)
  address: string;

  @Field(returns => String)
  ownerName: string;
}
