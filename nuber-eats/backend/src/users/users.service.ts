import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {CreateAccountInput, CreateAccountOutput} from './dtos/create-account-dto';
import {LoginInput, LoginOutput} from './dtos/login.dto';
import {JwtService} from '../jwt/jwt.service';
import {EditProfileInput, EditProfileOutput} from './dtos/edit-profile.dto';
import {Verification} from './entities/verification.entity';
import {VerifyEmailOutput} from './dtos/verify-email.dto';
import {UserProfileOutput} from './dtos/user-profile.dto';
import {MailService} from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification) private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {
  }

  async createAccount({email, password, role}: CreateAccountInput): Promise<CreateAccountOutput> {
    // 새로운 유저 인지 체크
    // 새로운 유저라면 계정을 생성하고 해쉬 패스워드
    try {
      const exists = await this.users.findOne({email});
      if (exists) {
        // 에러 발생 :: throw 에러 발생하는 방법도 있지만 에러인 경우 리턴을 시키는 방법으로 진행, resolver 에서 에러 처리
        return {
          ok   : false,
          error: 'There is a user with that email already'
        };
      }
      const user = await this.users.save(this.users.create({
        email,
        password,
        role
      }));
      const verification = await this.verifications.save(this.verifications.create({user}));
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return {ok: true};
    } catch (e) {
      // 에러 발생 :: throw 에러 발생하는 방법도 있지만 에러인 경우 리턴을 시키는 방법으로 진행, resolver 에서 에러 처리
      return {
        ok   : false,
        error: 'Couldn\'t create account'
      };
    }
  }

  async login({email, password}: LoginInput): Promise<LoginOutput> {
    // email 유저 찾기
    try {
      const user = await this.users.findOne({email}, {select: ['password']});
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
        error,
      };
    }
    // 찾은 유저의 password 확인
    // JWT 만들고 user에게 주기
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne({id});
      if (user) {
        return {
          ok  : true,
          user: user
        };
      }
    } catch (error) {
      return {
        ok   : false,
        error: 'User Not Found'
      };
    }
  }

  async editProfile(userId: number, {email, password}: EditProfileInput): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verifications.save(this.verifications.create({user}));
        // this.mailService.sendVerificationEmail(user.email, verification.code);
      }
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok   : false,
        error: 'Could not update profile.'
      };
    }
  }

  async verityEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verifications.findOne({code}, {relations: ['user']});
      if (verification) {
        verification.user.verified = true;
        await this.users.save(verification.user);
        await this.verifications.delete(verification.id);
        return {ok: true};
      }
      return {
        ok   : false,
        error: 'Verification not found'
      };
    } catch (error) {
      return {
        ok: false,
        error
      };
    }
  }
}
