import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req } from '@nestjs/common';
import { UserJWT } from 'src/Common/CustomTypes/User';
import { Action } from 'src/Common/Enums/Actions.enum';
import { AuthService } from '../Auth/auth.service';
import MangaService from './manga.service';

@Controller("/manga")
export class MangaController {
  constructor(private readonly mangaService: MangaService,
              private readonly authService: AuthService) {}

  @Post("/addManga")
  async addManga(@Body() body: any): Promise<void> {
    let isAuth : boolean = await this.authService.authAction(body.token, Action.AddManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.addManga(body.mangaInfoData, body.mangaName);
  }

  @Post("/addChapter")
  async addChapter(@Body() body: any): Promise<void> {
    let isAuth : boolean = await this.authService.authAction(body.token, Action.AddChapter);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.addChapter(body.chapterData, body.chapterImages);
  }
}
