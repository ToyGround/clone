import {v4 as uuidv4} from 'uuid';
import {BeforeInsert, Column, Entity, OneToOne, JoinColumn} from 'typeorm';
import {CoreEntity} from '../../common/entities/core.entity';
import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {User} from './user.entity';


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Verification extends CoreEntity {

	@Column()
	@Field(type => String)
	code: string;

	@OneToOne(type => User, {onDelete: 'CASCADE'})
	@JoinColumn()
	user: User;

	@BeforeInsert()
	createCode(): void {
		this.code = uuidv4();
	}
}
