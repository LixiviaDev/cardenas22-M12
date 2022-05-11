import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './Login/controller';
import LoginService from './Login/service';

@Module({
  imports: [],
  controllers: [AppController,
                LoginController],
  providers: [AppService,
              LoginService],
})
export class AppModule {}
