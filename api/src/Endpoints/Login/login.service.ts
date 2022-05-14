import { Injectable } from '@nestjs/common';
import Repository from './login.repository';
import { User, UserJWT } from '../../Common/CustomTypes/User';

require('dotenv').config();
const configData = require('../../../config.js');

const crypto = require("crypto");
const jwt = require('jsonwebtoken');

@Injectable()
export default class LoginService {
    static async login(user : string, password : string): Promise<string> {
        password = crypto.createHmac('sha256', password).update(password).digest("base64");

        let userData : User = await Repository.login(user, password)

        let tokenData : UserJWT = { userData: userData,
                                    iat: Date.now(),
                                    exp: Date.now() + parseInt(configData["JWT_DURATION"])}

        let token : string = "";
        
        if(userData?.username != null){
            token = jwt.sign(JSON.stringify(tokenData), configData["JWT_SECRET"]);
        }

        return token;
    }

    static async signup(email : string, user : string, password : string): Promise<void> {
        password = crypto.createHmac('sha256', password).update(password).digest("base64");

        await Repository.signup(email, user, password)
    }
}
