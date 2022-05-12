import { newUser, User } from "./User";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class LoginRepository {
    static async login(user : string, password : string): Promise<User> {

        let sql : any = db.prepare(`SELECT * FROM users
                                        WHERE username = ?
                                            AND password = ?`);
        let res : any = sql.get(user, password);

        let userData = newUser();
        userData.username = res?.username;

        sql = db.prepare(`SELECT  GROUP_CONCAT(roleId) as roles
                                        FROM userRoles
                                        WHERE userId = ?`);
        res = sql.all(res?.userId);

        userData.roles = res[0].roles?.split(',');

        return userData;
    }
  }