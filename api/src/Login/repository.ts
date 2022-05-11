const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class LoginRepository {
    static async login(user : string, password : string): Promise<boolean> {

        const sql : any = db.prepare(`SELECT COUNT(*) as count FROM users
                                        WHERE username = ?
                                            AND password = ?`);
        const res : any = sql.get(user, password);

        return (res.count > 0);
    }
  }