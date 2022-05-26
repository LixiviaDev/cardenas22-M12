import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './Endpoints/Auth/auth.controller';
import { AuthService } from './Endpoints/Auth/auth.service';
import { LoginController } from './Endpoints/Login/login.controller';
import LoginService from './Endpoints/Login/login.service';
import { MangaController } from './Endpoints/Manga/manga.controller';
import MangaService from './Endpoints/Manga/manga.service';
import { SearchController } from './Endpoints/Search/search.controller';
import SearchService from './Endpoints/Search/search.service';
import { UsersController } from './Endpoints/Users/users.controller';
import UsersService from './Endpoints/Users/users.service';

@Module({
  imports: [],
  controllers: [AppController,
                LoginController,
                AuthController,
                MangaController,
                SearchController,
                UsersController],
  providers: [AppService,
              LoginService,
              AuthService,
              MangaService,
              SearchService,
              UsersService],
})
export class AppModule {}
