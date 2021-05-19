import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		/**
		 * 여기서 받아오는 context 는 http 로 작성되어있다. 이걸 graphql 로 변경해줘야한다.
		 * */
		const gqlContext = GqlExecutionContext.create(context).getContext();
		const user = gqlContext['user'];
		if (!user) return false;
		return true;
	}
}