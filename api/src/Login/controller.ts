import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req } from '@nestjs/common';
import LoginService from './service';
import { User } from './User';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signup')
  async signup(@Body() body: any): Promise<any> {
      // if(!(await LoginService.signup(body.user, body.password)))
      //     throw(new HttpException('Invalid user', HttpStatus.FORBIDDEN))
  }

  @Post('login')
  async login(@Body() body: any): Promise<string> {

    let res : string = await LoginService.login(body.user, body.password);

    if(res == null)
      throw(new HttpException('Invalid user', HttpStatus.FORBIDDEN))
    else
      return res;
  }

  // @Post('logout')
  // async logout(@Body() body: any): Promise<any> {
  //     await LoginService.login(body.user, body.password);
  // }
}
