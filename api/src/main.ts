import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cors = require('cors');

require('dotenv').config();
const configData = require('../config.js');

const corsOptions = {
  origin: ['*',
          'http://lixiviareader.es',
          'http://localhost:3000'],
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions));
  await app.listen(configData.PORT);

  console.log(`Server running at http://${configData.HOST}:${configData.PORT}/`);
}
bootstrap();