import {ArgsType, Field} from '@nestjs/graphql';
import {IsBoolean, IsString, Length} from 'class-validator';

@ArgsType()
export class restaurantDto {
  @Field(returns => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field(returns => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field(returns => String)
  @IsString()
  address: string;

  @Field(returns => String)
  @IsString()
  ownerName: string;
}
