import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {
    // Validate required environment variables on startup
    this.validateConfig();
  }

  private validateConfig() {
    const requiredEnvVars = ['MONGO_URI'];
    const missingEnvVars = requiredEnvVars.filter(
      (envVar) => !this.configService.get(envVar)
    );

    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingEnvVars.join(', ')}`
      );
    }
  }

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI');
  }

  get port(): number {
    return this.configService.get<number>('PORT') || 3000;
  }

  get baseUrl(): string {
    return this.configService.get<string>('BASE_URL') || 'https://link-magic.vercel.app';
  }
}
