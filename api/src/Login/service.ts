import { Injectable } from '@nestjs/common';
import Repository from './repository';

@Injectable()
export default class LoginService {
    static async login(user : string, password : string): Promise<boolean> {
    if((await Repository.login(user, password)))
        return true;
    else
        return false;
}
}
