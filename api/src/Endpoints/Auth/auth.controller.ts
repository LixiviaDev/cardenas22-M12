import { Body, Query, Controller, Post, Get, HttpException, HttpStatus, Req, Param } from '@nestjs/common';
import { Role } from 'src/Common/CustomTypes/Role';
import { UserJWT } from 'src/Common/CustomTypes/User';
import { Action } from 'src/Common/Enums/Actions.enum';
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

  @Post('getAllRoles')
  async getAllRoles(@Body() body: any): Promise<Role[]> {
    let isAuth : boolean = await this.authService.authAction(body.token, Action.SearchManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN);

    let res = await this.authService.getAllRoles();

    return res;
  }

  @Post('getUserRoles')
  async getUserRoles(@Body() body: any): Promise<Role[]> {
    let isAuth : boolean = await this.authService.authAction(body.token, Action.SearchManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN);
    
    let res = await this.authService.getUserRoles(body.userId);

    return res;
  }

  @Post('addUserRole')
  async addUserRole(@Body() body: any): Promise<void> {
    let isAuth : boolean = await this.authService.authAction(body.token, Action.SearchManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN);
    
    await this.authService.addUserRole(body.roleId, body.userId);
  }

  @Post('removeUserRole')
  async removeUserRole(@Body() body: any): Promise<void> {
    let isAuth : boolean = await this.authService.authAction(body.token, Action.SearchManga);

    if(!isAuth)
      throw new HttpException('Invalid user', HttpStatus.FORBIDDEN);
    
    await this.authService.removeUserRole(body.roleId, body.userId);
  }
}
