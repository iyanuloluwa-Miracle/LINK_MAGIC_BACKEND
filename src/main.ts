import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);

  // Configure CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',     // Vite default development port
      'http://localhost:3000',     // Alternative local development port
      'https://link-magic.vercel.app', // Add your frontend production URL
      /\.vercel\.app$/,           // Allow all subdomains on vercel.app
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();