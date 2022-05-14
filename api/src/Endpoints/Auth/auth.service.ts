import { Injectable } from '@nestjs/common';
import { UserJWT } from 'src/Common/CustomTypes/User';
import authRepository from './auth.repository';

require('dotenv').config();
const configData = require('../../../config.js');

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  static async auth(token : string): Promise<boolean> {
    // password = crypto.createHmac('sha256', password).update(password).digest("base64");

    // let userData : User = await Repository.login(user, password)

    // let token : string = "";

    // if(userData?.username != null){
    //     token = jwt.sign(userData, configData["JWT_SECRET"]);
    // }

    return true;
  }

  static async authAction(tokenData : UserJWT, action : string): Promise<boolean> {
    let res = authRepository.authAction(tokenData.userData, action);
    // password = crypto.createHmac('sha256', password).update(password).digest("base64");

    // let userData : User = await Repository.login(user, password)

    // let token : string = "";

    // if(userData?.username != null){
    //     token = jwt.sign(userData, configData["JWT_SECRET"]);
    // }

    return res;
  }

  static async verifyJWT(token : string): Promise<UserJWT> {
    
    let tokenData : UserJWT = new UserJWT();

    try {
      tokenData = await jwt.verify(token, configData["JWT_SECRET"]);
    } catch(err) {
      console.log(err);
    }

    return tokenData;
  }
}
