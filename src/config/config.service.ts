import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI');
  }
}
