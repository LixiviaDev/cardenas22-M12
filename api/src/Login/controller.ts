import { Body, Query, Controller, Get, HttpException, HttpStatus, Req } from '@nestjs/common';
import LoginService from './service';
import { Request } from 'express';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('login')
//   async getHello(@Req() request: Request): void {
    async login(@Req() request: Request, @Body() body: any, @Query() query: any): Promise<string> {

        return `user: ${query.user} || pass: ${query.password}`;

        if(!(await LoginService.login(query.user, query.password)))
            throw(new HttpException('Invalid user', HttpStatus.FORBIDDEN))
    }
}
