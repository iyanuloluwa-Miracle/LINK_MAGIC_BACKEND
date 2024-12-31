import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './schemas/url.schema';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async shortenUrl(createUrlDto: CreateUrlDto): Promise<Url> {
    const { longUrl } = createUrlDto;
    const baseUrl = process.env.BASE_URL;

    const shortCode = shortid.generate();
    const shortUrl = `${baseUrl}/${shortCode}`;

    const url = new this.urlModel({ longUrl, shortUrl });
    return await url.save();
  }

  async redirectUrl(shortCode: string): Promise<string> {
    const url = await this.urlModel.findOne({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    url.clicks++;
    await url.save();
    return url.longUrl;
  }
}
