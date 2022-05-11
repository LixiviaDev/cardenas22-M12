const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.db');

export default class LoginRepository {
    static async login(user : string, password : string): Promise<boolean> {
        let sql : string = `SELECT COUNT(*) as count FROM users
                                WHERE username LIKE ${user}
                                    AND password LIKE ${password}`;

        db.serialize(()=>{
            db.get(sql, (err,row) => {     
                if(err){
                    return false;
                }
                
                return row.count > 0;
            });
        });
    
        return false;
    }
  }