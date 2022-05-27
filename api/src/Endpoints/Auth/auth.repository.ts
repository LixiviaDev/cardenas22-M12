import { Role } from "src/Common/CustomTypes/Role";
import { Role as Roles } from "src/Common/Enums/Roles.enum";
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

        if(userData.roles.includes(Roles.Admin)) // If is admin has access 
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
        let res : any = await eval(getEval);

        console.log("Role ID: " + JSON.stringify(res));

        if(res?.roleId == null)
            return false;
        
        return true;
    }

    static async isAdmin(userData : User): Promise<boolean> {
        console.log("UserData: " + userData);

        let sql : string = `SELECT userId FROM userRoles
                            WHERE userId = $userId
                                AND roleId = $roleId;`;

        let query : any = db.prepare(sql);
        let res : any = query.get({userId: userData.userId, roleId: Roles.Admin});

        if(res?.userId != undefined)
            return true;
        
        return false;
    }

    static async getAllRoles(): Promise<Role[]> {
        let sql : string = `SELECT roleId, name
                            FROM roles;
                            `;

        let query = db.prepare(sql);
        let res : Role[] = query.all();
        
        return res;
    }

    static async getUserRoles(userId : string): Promise<Role[]> {
        let sql : string = `SELECT userId, roleId 
                            FROM userRoles
                                WHERE userId = $userId;
                            `;

        let query = db.prepare(sql);
        let res : Role[] = query.all({userId: userId});
        
        return res;
    }
  }