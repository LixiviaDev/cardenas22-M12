import { HttpException, HttpStatus } from "@nestjs/common";
import { MangaBriefInfoData } from "src/Common/CustomTypes/Manga";
import { UserBriefData } from "src/Common/CustomTypes/User";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class UsersRepository {
    static async getAll(): Promise<UserBriefData[]> {
        let sql = db.prepare(`SELECT userId,
                                    username,
                                    image,
                                    dateAdded
                                FROM users;
        `);

        try{
            let res : UserBriefData[] = sql.all();

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    static async getOne(userId: string): Promise<UserBriefData> {
        let sql = db.prepare(`SELECT userId,
                                        username,
                                        image,
                                        dateAdded
                                FROM users
                                WHERE userId = $userId
        `);

        try{
            let res : UserBriefData = sql.get({userId: userId});

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}