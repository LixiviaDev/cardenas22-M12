import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req } from '@nestjs/common';
import LoginService from './service';
import { Request } from 'express';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
//   async getHello(@Req() request: Request): void {
    async login(@Req() request: Request, @Body() body: any, @Query() query: any): Promise<any> {
        if(!(await LoginService.login(body.user, body.password)))
            throw(new HttpException('Invalid user', HttpStatus.FORBIDDEN))
    }
}
