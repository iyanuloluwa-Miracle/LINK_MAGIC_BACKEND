import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config module available globally
      envFilePath: '.env', // Path to your .env file
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigAppModule {}
