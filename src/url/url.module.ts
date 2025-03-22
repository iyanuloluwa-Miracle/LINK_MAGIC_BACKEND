import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Url, UrlSchema } from './schemas/url.schema';
import { ConfigAppModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    ConfigAppModule
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
