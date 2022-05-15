// import { User } from "../../Common/CustomTypes/User";

// const Database = require('better-sqlite3');
// const db = new Database('./db.db', { verbose: console.log });

// export default class LoginRepository {
//     static async login(user : string, password : string): Promise<User> {

//         let sql : any = db.prepare(`SELECT * FROM users
//                                         WHERE username = ?
//                                             AND password = ?`);
//         let res : any = sql.get(user, password);

//         let userData = new User();
//         if(res.username != null){
//             userData.username = res.username;
    
//             sql = db.prepare(`SELECT GROUP_CONCAT(roleId) as roles
//                                     FROM userRoles
//                                         WHERE userId = ?`);
//             res = sql.get(res.userId);
    
//             console.log(JSON.stringify(res));

//             userData.roles = res.roles?.split(`,`) ?? [];
//         }

//         console.log(JSON.stringify(userData));

//         return userData;
//     }

//     static async signup(email : string, user : string, password : string): Promise<void> {

//         let sql : any = db.prepare(`INSERT INTO users   (
//                                                             userId,
//                                                             username,
//                                                             password,
//                                                             dateAdded
//                                                         )
//                                                         VALUES (
//                                                             ?,
//                                                             ?,
//                                                             ?,
//                                                             ?
//                                                         );
//                                                 `);

//         let dateAdded = new Date(Date.now());

//         let res : any = sql.run(email, user, password, dateAdded.toISOString().split('T')[0]);
//     }
//   }