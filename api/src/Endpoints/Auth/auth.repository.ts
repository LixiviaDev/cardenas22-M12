import { Role } from "src/Common/Enums/Roles.enum";
import { User } from "../../Common/CustomTypes/User";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class authRepository {
    static async auth(user : string, password : string): Promise<boolean> {

        // let sql : any = db.prepare(`SELECT * FROM users
        //                                 WHERE username = ?
        //                                     AND password = ?`);
        // let res : any = sql.get(user, password);

        // let userData = newUser();
        // if(res.username != null){
        //     userData.username = res.username;
    
        //     sql = db.prepare(`SELECT GROUP_CONCAT(roleId) as roles
        //                             FROM userRoles
        //                                 WHERE userId = ?`);
        //     res = sql.get(res.userId);
    
        //     userData.roles = res.roles.split(`,`);
        // }

        return true;
    }

    static async authAction(userData : User, action : string): Promise<boolean> {

        console.log("USerData: " + userData);

        if(userData.roles.includes(Role.Admin)) // If is admin has access 
            return true;



        let sql : string = `SELECT roleId
                            FROM actionRoles
                                WHERE actionId = ?
                                    AND (roleId = 0`;
        
        let getEval : string = `query.get(action`; // sql.get(action [, roles]);

        for(let role of userData.roles){
            sql += ` OR roleId = ?`;
            getEval += `, ${role}`;
        }

        sql += `);`;
        getEval += `);`;



        let query : any = db.prepare(sql);
        let res : any = eval(getEval);



        if(res?.roleId == null)
            return false;
        
        return true;
    }
  }