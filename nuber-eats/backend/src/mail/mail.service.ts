import got from 'got';
import * as FormData from 'form-data';
import {Inject} from '@nestjs/common';
import {CONFIG_OPTIONS} from '../common/common.constants';
import {EmailVar, MailModuleOptions} from './mail.interface';


export class MailService {
  constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions) {
  }

  private async sendEmail(subject: string, template: string, emailVars: EmailVar[]) {
    const form = new FormData();
    form.append('from', `mailgun@${this.options.domain}`);
    form.append('to', `${this.options.toEmail}`);
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`,
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
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Confirm Your Email', 'please_confirm_your_account', [
      {
        key  : 'code',
        value: code
      },
      {
        key  : 'username',
        value: email
      }
    ]);
  }

}