import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req, Param } from '@nestjs/common';
import { UserJWT } from 'src/Common/CustomTypes/User';
import { AuthService } from './auth.service';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}@Post('auth')

  @Post()
  async auth(@Body() body: any): Promise<boolean> {
    console.log("Token: " + body.token);
    
    let res : boolean = await this.authService.auth(body.token);

    return true;
  }

  @Post('action/:actionId')
  async actionId(@Body() body: any, @Param() params: any): Promise<boolean> {
    // let tokenData : UserJWT = await this.authService.verifyJWT(body.token);
    console.log("Token: " + body.token);

    let res : boolean = await this.authService.authAction(body.token, params.actionId);

    return res;
  }

  @Post('isAdmin')
  async isAdmin(@Body() body: any): Promise<any> {
    let res = await this.authService.isAdmin(body.token);

    console.log("IsAuth: " + res);

    return res;
  }
}
