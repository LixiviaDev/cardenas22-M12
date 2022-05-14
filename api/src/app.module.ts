import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './Endpoints/Auth/auth.controller';
import { AuthService } from './Endpoints/Auth/auth.service';
import { LoginController } from './Endpoints/Login/login.controller';
import LoginService from './Endpoints/Login/login.service';

@Module({
  imports: [],
  controllers: [AppController,
                LoginController,
                AuthController],
  providers: [AppService,
              LoginService,
              AuthService],
})
export class AppModule {}
