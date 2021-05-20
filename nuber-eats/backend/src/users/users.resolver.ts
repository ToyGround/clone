import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import {User} from './entities/user.entity';
import {UsersService} from './users.service';
import {CreateAccountInput, CreateAccountOutput} from './dtos/create-account-dto';
import {LoginInput, LoginOutput} from './dtos/login.dto';
import {UseGuards} from '@nestjs/common';
import {AuthGuard} from '../auth/auth.guard';
import {AuthUser} from '../auth/auth-user.decorator';
import {UserProfileInput, UserProfileOutput} from './dtos/user-profile.dto';
import {EditProfileInput, EditProfileOutput} from './dtos/edit-profile.dto';
import {VerifyEmailInput, VerifyEmailOutput} from './dtos/verify-email.dto';

@Resolver(of => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {
	}

	@Query(returns => Boolean)
	test() {
		return true;
	}

	@Mutation(returns => CreateAccountOutput)
	async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
		try {
			return this.usersService.createAccount(createAccountInput);
		} catch (e) {
			return {
				ok   : false,
				error: e
			};
		}
	}

	@Mutation(returns => LoginOutput)
	async login(@Args('input') loginInput: LoginInput) {
		try {
			return this.usersService.login(loginInput);
		} catch (error) {
			return {
				ok: false,
				error
			};
		}
	}

	@Query(returns => User)
	@UseGuards(AuthGuard)
	me(@AuthUser() authUser: User) {
		return authUser;
	}

	@Query(returns => UserProfileOutput)
	@UseGuards(AuthGuard)
	async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
		try {
			const user = await this.usersService.findById(userProfileInput.userId);
			if (!user) {
				throw Error();
			}
			return {
				ok: true,
				user
			};
		} catch (e) {
			return {
				error: 'User Not Found',
				ok   : false
			};
		}
	}


	@UseGuards(AuthGuard)
	@Mutation(returns => EditProfileOutput)
	async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput): Promise<EditProfileOutput> {
		try {
			await this.usersService.editProfile(authUser.id, editProfileInput);
			return {
				ok: true
			};
		} catch (error) {
			return {
				ok: false,
				error
			};

		}
	}

	@Mutation(returns => VerifyEmailOutput)
	async verifyEmail(@Args('input') {code}: VerifyEmailInput) {
		try {
			await this.usersService.verityEmail(code);
			return {
				ok: true
			};
		} catch (error) {
			return {
				ok: false,
				error
			};
		}
	}
}
