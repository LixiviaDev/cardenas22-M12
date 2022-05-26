import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req, Param } from '@nestjs/common';
import { MangaBriefInfoData } from 'src/Common/CustomTypes/Manga';
import { UserBriefData } from 'src/Common/CustomTypes/User';
import { Action } from 'src/Common/Enums/Actions.enum';
import { AuthService } from '../Auth/auth.service';
import UsersService from './users.service';

@Controller("/users")
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly authService: AuthService) {}

  @Post("/getAll")
  async getAll(@Body() body: any): Promise<UserBriefData[]> {
    let isAuth : boolean = await this.authService.authAction(body.token, Action.SearchManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN)

    return await this.usersService.getAll();
  }
}