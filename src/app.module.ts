import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';
import { ConfigAppModule } from './config/config.module';
import { AppConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigAppModule, // Import the config module
    MongooseModule.forRootAsync({
      imports: [ConfigAppModule], // Ensure the ConfigAppModule is imported here
      useFactory: (configService: AppConfigService) => ({
        uri: configService.mongoUri,
      }),
      inject: [AppConfigService],
    }),
    UrlModule,
  ],
})
export class AppModule {}
