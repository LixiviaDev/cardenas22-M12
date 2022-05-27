import { Injectable } from '@nestjs/common';
import { Role } from 'src/Common/CustomTypes/Role';
import { User, UserJWT } from 'src/Common/CustomTypes/User';
import authRepository from './auth.repository';

require('dotenv').config();
const configData = require('../../../config.js');

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  async auth(token : string): Promise<boolean> {
    // password = crypto.createHmac('sha256', password).update(password).digest("base64");

    // let userData : User = await Repository.login(user, password)

    // let token : string = "";

    // if(userData?.username != null){
    //     token = jwt.sign(userData, configData["JWT_SECRET"]);
    // }

    return true;
  }

  async authAction(token : string, action : string): Promise<boolean> {
    console.log("Token: " + token);

    let tokenData : UserJWT = await this.verifyJWT(token);

    let res = await authRepository.authAction(tokenData.userData, action);

    console.log("isAuth: " + res);

    return res;
  }

  async verifyJWT(token : string): Promise<UserJWT> {
    
    let tokenData : UserJWT = new UserJWT();

    try {
      tokenData = await jwt.verify(token, configData["JWT_SECRET"]);
    } catch(err) {
      tokenData.userData = new User();
      tokenData.userData.roles = ["-1"]
      console.log(err);
    }

    return tokenData;
  }

  async isAdmin(token : string): Promise<any> {
    let tokenData : UserJWT = await this.verifyJWT(token);

    let isAdmin = await authRepository.isAdmin(tokenData.userData);

    return {isAdmin: isAdmin};
  }

  async getAllRoles(): Promise<Role[]> {
    let roles = await authRepository.getAllRoles();

    return roles;
  }

  async getUserRoles(userId : string): Promise<Role[]> {
    let roles = await authRepository.getUserRoles(userId);

    return roles;
  }
}
