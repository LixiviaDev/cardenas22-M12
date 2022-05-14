import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req, Param } from '@nestjs/common';
import { UserJWT } from 'src/Common/CustomTypes/User';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}@Post('auth')

  @Post('auth')
  async auth(@Body() body: any): Promise<boolean> {
    let res : boolean = await AuthService.auth(body.token);

    return true;
  }

  @Post('auth/:actionId')
  async authEditManga(@Body() body: any, @Param() params: any): Promise<boolean> {
    let tokenData : UserJWT = await AuthService.verifyJWT(body.token);

    let res : boolean = await AuthService.authAction(tokenData, params.actionId);

    return res;
  }
}
