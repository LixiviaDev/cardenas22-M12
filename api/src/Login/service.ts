import { Injectable } from '@nestjs/common';
import Repository from './repository';
import { User } from './User';

require('dotenv').config();
const configData = require('../../config.js');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

@Injectable()
export default class LoginService {
    static async login(user : string, password : string): Promise<string> {
        password = crypto.createHmac("sha256", password).update(password).digest("Base64");

        let userData = await Repository.login(user, password);
        
        let token : string = null;
        if(userData?.username != null)
            token = jwt.sign(userData, configData["JWT_SECRET"]);

        return token;
    }
}
