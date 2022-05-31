import { HttpException, HttpStatus } from "@nestjs/common";
import { User } from "../../Common/CustomTypes/User";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class LoginRepository {
    static async login(user : string, password : string): Promise<User> {

        let sql : any = db.prepare(`SELECT * FROM users
                                        WHERE username = ?
                                            AND password = ?`);
        let res : any = sql.get(user, password);

        let userData = new User();
        if(res?.username != null){
            userData.userId = res.userId;
            userData.username = res.username;
    
            sql = db.prepare(`SELECT GROUP_CONCAT(roleId) as roles
                                    FROM userRoles
                                        WHERE userId = ?`);
            res = sql.get(res.userId);
    
            console.log(JSON.stringify(res));

            userData.roles = res.roles?.split(`,`) ?? [];
        }

        console.log(JSON.stringify(userData));

        return userData;
    }

    static async signup(email : string, user : string, password : string): Promise<void> {

        let sql : any = db.prepare(`INSERT INTO users   (
                                                            username,
                                                            password,
                                                            email,
                                                            dateAdded
                                                        )
                                                        VALUES (
                                                            @user,
                                                            @password,
                                                            @email,
                                                            @dateaAdded
                                                        );
                                                `);

        let dateAdded = new Date(Date.now());
        
        try{
            let res : any = sql.run({   email: email,
                                        user: user, 
                                        password: password, 
                                        dateaAdded: dateAdded.toISOString()});
        } catch(ex) {
            throw new HttpException(ex, HttpStatus.CONFLICT);
        }
    }
  }