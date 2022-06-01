import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req, Param } from '@nestjs/common';
import { ChapterImage } from 'src/Common/CustomTypes/Chapter';
import { MangaBriefInfoData, MangaInfoData, MangaManagementData, MangaPreviewCardData } from 'src/Common/CustomTypes/Manga';
import { UserJWT } from 'src/Common/CustomTypes/User';
import { Action } from 'src/Common/Enums/Actions.enum';
import { ChapterData } from 'src/Common/Tables/ChapterData';
import { AuthService } from '../Auth/auth.service';
import MangaService from './manga.service';

@Controller("/manga")
export class MangaController {
  constructor(private readonly mangaService: MangaService,
              private readonly authService: AuthService) {}

    @Post("/getOneBrief")
    async getOneBrief(@Body() body: any): Promise<MangaBriefInfoData> {
      let isAuth : boolean = await this.authService.authAction(body.token, Action.GetManga);
  
      if(!isAuth)
        throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)
  
      let res = await this.mangaService.getOneBrief(body.mangaId);

      return res;
    }

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

  @Post("/managementData")
  async managementData(@Body() body: any): Promise<MangaManagementData> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.GetManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    let res = await this.mangaService.managementData(body.mangaId);

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

  @Post("/chapterImages")
  async chapterImages(@Body() body: any): Promise<ChapterImage[]> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.GetChatperImages);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    let res = await this.mangaService.chapterImages(body.mangaId, body.mangaServerId, body.chapterId);

    return res;
  }

  @Post("/addWriter")
  async addWriter(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.addWriter(body.mangaId, body.name);
  }

  @Post("/removeWriter")
  async removeWriter(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.removeWriter(body.mangaId, body.name);
  }

  @Post("/addArtist")
  async addArtist(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.addArtist(body.mangaId, body.name);
  }

  @Post("/removeArtist")
  async removeArtist(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.removeArtist(body.mangaId, body.name);
  }

  @Post("/addTag")
  async addTag(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.addTag(body.mangaId, body.tagId);
  }

  @Post("/removeTag")
  async removeTag(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.removeTag(body.mangaId, body.tagId);
  }

  @Post("/changeTitle")
  async changeTitle(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.changeTitle(body.mangaId, body.title);
  }

  @Post("/changeSinopsis")
  async changeSinopsis(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.changeSinopsis(body.mangaId, body.mangaServerId, body.sinopsis);
  }

  @Post("/changeState")
  async changeState(@Body() body: any): Promise<void> {
    console.log("Body: " + JSON.stringify(body));

    let isAuth : boolean = await this.authService.authAction(body.token, Action.EditManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    await this.mangaService.changeState(body.mangaId, body.mangaServerId, body.state);
  }
}
