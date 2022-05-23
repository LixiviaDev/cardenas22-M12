import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req, Param } from '@nestjs/common';
import { MangaBriefInfoData } from 'src/Common/CustomTypes/Manga';
import { Action } from 'src/Common/Enums/Actions.enum';
import { AuthService } from '../Auth/auth.service';
import SearchService from './search.service';

@Controller("/search")
export class SearchController {
  constructor(private readonly searchService: SearchService,
              private readonly authService: AuthService) {}

  @Post("/manga")
  async manga(@Body() body: any): Promise<MangaBriefInfoData[]> {
    let isAuth : boolean = await this.authService.authAction(body.token, Action.SearchManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    return await this.searchService.manga(body.search);
  }
}