import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req, Param } from '@nestjs/common';
import { ChapterData } from 'src/Common/CustomTypes/Chapter';
import { MangaInfoData, MangaPreviewCardData } from 'src/Common/CustomTypes/Manga';
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

  @Post("/testMangaPreviewCard/:page?")
  async testMangaPreviewCard(@Body() body: any, @Param() params: any): Promise<MangaPreviewCardData[]> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.GetManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    let res = await this.mangaService.testMangaPreviewCard(params.page);

    return res;
  }

  @Post("/info")
  async info(@Body() body: any): Promise<MangaInfoData> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.GetManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    let res = await this.mangaService.info(body.mangaId);

    return res;
  }

  @Post("/chapterList")
  async chapterList(@Body() body: any): Promise<ChapterData[]> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.GetChatperList);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    let res = await this.mangaService.chapterList(body.mangaId, body.mangaServerId);

    return res;
  }
}
