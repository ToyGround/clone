import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {CreateAccountInput} from './dtos/create-account-dto';
import {LoginInput} from './dtos/login.dto';
import {JwtService} from '../jwt/jwt.service';
import {EditProfileInput} from './dtos/edit-profile.dto';
import {Verification} from './entities/verification.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly users: Repository<User>,
		@InjectRepository(Verification) private readonly verifications: Repository<Verification>,
		private readonly jwtService: JwtService,
	) {
	}

	async createAccount({email, password, role}: CreateAccountInput): Promise<{ ok: boolean, error?: string }> {
		// 새로운 유저 인지 체크
		// 새로운 유저라면 계정을 생성하고 해쉬 패스워드
		try {
			const exists = await this.users.findOne({email});
			if (exists) {
				// 에러 발생 :: throw 에러 발생하는 방법도 있지만 에러인 경우 리턴을 시키는 방법으로 진행, resolver 에서 에러 처리
				return {ok: false, error: 'There is a user with that email already'};
			}
			const user = await this.users.save(this.users.create({email, password, role}));
			await this.verifications.save(this.verifications.create({user}));
			return {ok: true};
		} catch (e) {
			// 에러 발생 :: throw 에러 발생하는 방법도 있지만 에러인 경우 리턴을 시키는 방법으로 진행, resolver 에서 에러 처리
			return {ok: false, error: 'Couldn\'t create account'};
		}
	}

	async login({email, password}: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
		// email 유저 찾기
		try {
			const user = await this.users.findOne({email}, {select: ['id', 'password']});
			if (!user) {
				return {
					ok   : false,
					error: 'User not found'
				};
			}
			const passwordCorrect = await user.checkPassword(password);
			if (!passwordCorrect) {
				return {
					ok   : false,
					error: 'Wrong password'
				};
			}
			const token = this.jwtService.sign(user.id);
			return {
				ok: true,
				token
			};
		} catch (error) {
			return {
				ok: false,
				error
			};
		}
		// 찾은 유저의 password 확인
		// JWT 만들고 user에게 주기
	}

	async findById(id: number): Promise<User> {
		return this.users.findOne({id});
	}

	async editProfile(userId: number, {email, password}: EditProfileInput) {
		const user = await this.users.findOne(userId);
		if (email) {
			user.email = email;
			user.verified = false;
			await this.verifications.save(this.verifications.create({user}));
		}
		if (password) {
			user.password = password;
		}
		return this.users.save(user);
	}

	async verityEmail(code: string): Promise<boolean> {
		try {
			const verification = await this.verifications.findOne({code}, {relations: ['user']});
			if (verification) {
				verification.user.verified = true;
				this.users.save(verification.user);
				return true;
			}
			throw new Error();
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}
