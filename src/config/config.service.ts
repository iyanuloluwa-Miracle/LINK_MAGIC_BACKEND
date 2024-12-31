import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  // Get environment variables
  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI');
  }

  get baseUrl(): string {
    return this.configService.get<string>('BASE_URL');
  }
}
