import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(@Body() createUrlDto: CreateUrlDto) {
    try {
      const url = await this.urlService.shortenUrl(createUrlDto);
      return { 
        success: true, 
        shortUrl: url.shortUrl,
        originalUrl: url.longUrl 
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: error.message || 'Failed to shorten URL'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string) {
    try {
      const url = await this.urlService.redirectUrl(shortCode);
      return { 
        success: true, 
        longUrl: url.longUrl 
      };
    } catch (error) {
      throw new HttpException({
        success: false,
        message: 'URL not found'
      }, HttpStatus.NOT_FOUND);
    }
  }
}