import {Inject, Injectable} from '@nestjs/common';
import {JwtModuleOptions} from './jwt.interface';
import {CONFIG_OPTIONS} from './jwt.constans';

@Injectable()
export class JwtService {
	constructor(
		@Inject(CONFIG_OPTIONS) private readonly option: JwtModuleOptions
	) {
	}
}
