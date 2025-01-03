import { Controller, Post, Body, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(@Body() createUrlDto: CreateUrlDto) {
    const url = await this.urlService.shortenUrl(createUrlDto);
    return { success: true, shortUrl: url.shortUrl };
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const longUrl = await this.urlService.redirectUrl(shortCode);
    return res.redirect(HttpStatus.FOUND, longUrl);
  }
}
