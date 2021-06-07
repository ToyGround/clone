export interface MailModuleOptions {
  apiKey: string;
  domain: string;
  fromEmail: string;
  toEmail: string
}

export interface EmailVar {
  key: string;
  value: string
}