import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req } from '@nestjs/common';
import LoginService from './login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() body: any): Promise<string> {
    let res : string = await LoginService.login(body.user, body.password);
    
    if(res == "")
        throw(new HttpException('Invalid user', HttpStatus.FORBIDDEN))

    return res;
  }

  @Post('signup')
  async signup(@Body() body: any): Promise<void> {
    await LoginService.signup(body.email, body.user, body.password);
  }
}
