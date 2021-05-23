import {DynamicModule, Module} from '@nestjs/common';
import {CONFIG_OPTIONS} from '../common/common.constants';
import {mailModuleOptions} from './mail.interface';

@Module({})
export class MailModule {
  static forRoot(options: mailModuleOptions): DynamicModule {
    return {
      module   : MailModule,
      exports  : [],
      providers: [
        {
          provide : CONFIG_OPTIONS,
          useValue: options,
        }
      ]
    };
  }
}
