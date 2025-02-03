import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async shortenUrl(createUrlDto: CreateUrlDto) {
    try {
      let { longUrl } = createUrlDto;
  
      // Validate URL format
      if (!longUrl) {
        throw new HttpException('URL is required', HttpStatus.BAD_REQUEST);
      }
  
      // Add protocol if missing
      if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
        longUrl = `https://${longUrl}`;
      }
  
      try {
        new URL(longUrl);
      } catch {
        throw new HttpException('Invalid URL format', HttpStatus.BAD_REQUEST);
      }
  
      // Check if URL already exists
      const existingUrl = await this.urlModel.findOne({ longUrl });
      if (existingUrl) {
        return existingUrl;
      }
  
      // Generate short code
      const shortCode = nanoid(8);
      const shortUrl = `${process.env.BASE_URL || 'https://link-magic.vercel.app'}/url/${shortCode}`;
  
      // Create new URL document
      const newUrl = await this.urlModel.create({
        longUrl,
        shortCode,
        shortUrl,
        createdAt: new Date()
      });
  
      return newUrl;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to shorten URL',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async redirectUrl(shortCode: string) {
    const url = await this.urlModel.findOne({ shortCode });
    if (!url) {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }
    return url;
  }
}