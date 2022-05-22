import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req } from '@nestjs/common';
import LoginService from './login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() body: any): Promise<string> {
    let res : any = await this.loginService.login(body.user, body.password);
    
    if(res?.token == undefined || res?.token == "")
        throw(new HttpException('Invalid user', HttpStatus.FORBIDDEN))

    return JSON.stringify(res);
  }

  @Post('signup')
  async signup(@Body() body: any): Promise<void> {
    await this.loginService.signup(body.email, body.user, body.password);
  }
}
