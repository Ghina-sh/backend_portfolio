import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors(); // Enable CORS for cross-origin requests
  app.setGlobalPrefix('api'); // Set the global prefix for routes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();
}
bootstrap();

// Export server for Vercel's serverless function
export default server;

/*
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { Server } from 'http';

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.enableCors(); // Enable CORS if needed
  return app.init();
};

createNestServer(server);

const app = new Server(server);
export default app;

*/
