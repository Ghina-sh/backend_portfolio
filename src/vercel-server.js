const { createServer } = require('http');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');
const { AppModule } = require('./dist/app.module');

const server = express();
let nestApp;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();
}

bootstrap();

// Handle requests and return 404 if no route matches
module.exports = (req, res) => {
  server(req, res, () => {
    res.statusCode = 404;
    res.end('404: Not Found');
  });
};
