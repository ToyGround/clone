import {Column, Entity, OneToOne} from 'typeorm';
import {CoreEntity} from '../../common/entities/core.entity';
import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {User} from './user.entity';
import {JoinColumn} from 'typeorm';


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Verification extends CoreEntity {

	@Column()
	@Field(type => String)
	code: string;

	@OneToOne(type => User)
	@JoinColumn()
	user: User;
}
