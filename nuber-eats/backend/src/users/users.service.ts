import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {CreateAccountInput} from "./dtos/create-account-dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {
  }

  async createAccount({email, password, role}: CreateAccountInput): Promise<string | undefined> {
    // 새로운 유저 인지 체크
    // 새로운 유저라면 계정을 생성하고 해쉬 패스워드
    try {
      const exists = await this.users.findOne({email})
      if(exists) {
        // 에러 발생 :: throw 에러 발생하는 방법도 있지만 에러인 경우 리턴을 시키는 방법으로 진행, resolver 에서 에러 처리
        return 'There is a user with that email already'
      }
      await this.users.save(this.users.create({email, password, role}))
    } catch (e) {
      // 에러 발생 :: throw 에러 발생하는 방법도 있지만 에러인 경우 리턴을 시키는 방법으로 진행, resolver 에서 에러 처리
      return "Couldn't create account"
    }
  }
}
