import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor() {
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  public get(key: string): string {
    return process.env[key];
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV');
  }

  get cors(): string {
    return this.get('FRONTEND_APPLICATION_URL') || 'http://localhost:3000';
  }

  get SendGridApiKey(): string {
    return this.get('SEND_GRID_API_KEY');
  }

  get frontendAppURL(): string {
    return this.get('FRONTEND_APPLICATION_URL');
  }

  get JwtSecret(): string {
    return this.get('JWT_SECRET');
  }

  get JwtExpirationTime(): string {
    return this.get('JWT_EXPIRATION_TIME');
  }

  get NoReplyEmail(): string {
    return this.get('NO_REPLY_EMAIL');
  }
}
