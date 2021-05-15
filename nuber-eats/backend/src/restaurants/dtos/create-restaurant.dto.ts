import {InputType, OmitType} from '@nestjs/graphql';
import {Restaurant} from '../entities/restaurant.entities';

/**
 * InputType 에서 OmitType은 Input 타입일떄만 사용 가능한데 Restaurant entities 에서는 class ObjectType 이다.
 * 그래서 OmitType() 의 3번쨰 옵셔널값으로 데코레이션 해준다.
 * */
@InputType()
export class createRestaurantDto extends OmitType(Restaurant, ['id'], InputType) {
}
