import got from 'got';
import * as FormData from 'form-data';
import {Inject} from '@nestjs/common';
import {CONFIG_OPTIONS} from '../common/common.constants';
import {MailModuleOptions} from './mail.interface';


export class MailService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions) {
  }

  private async sendEmail(subject: string, content: string, to?: string) {
    const form = new FormData();
    form.append('from', `mailgun@${this.options.domain}`);
    form.append('to', `${this.options.toEmail}`);
    form.append('subject', subject);
    form.append('template', 'please_confirm_your_account');
    form.append('v:username', 'userName!');
    form.append('v:code', 'aaacode');

    const response = await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        https  : {
          rejectUnauthorized: false
        },
        method : 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body   : form,
      },
    );
    console.log(response.body);
  }
}