import {InputType, ObjectType, PartialType, PickType} from '@nestjs/graphql';
import {MutationOutput} from '../../common/dtos/output.dto';
import {User} from '../entities/user.entity';

@InputType()
export class EditProfileInput extends PartialType(PickType(User, ['email', 'password'])) {
}

@ObjectType()
export class EditProfileOutput extends MutationOutput {
}