import { HttpException, HttpStatus } from "@nestjs/common";
import { MangaBriefInfoData } from "src/Common/CustomTypes/Manga";
import { UserBriefData } from "src/Common/CustomTypes/User";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class SearchRepository {
    static async manga(search: string): Promise<MangaBriefInfoData[]> {
        let sql = db.prepare(`SELECT mangaInfo.mangaId,
                                    mangaInfo.mangaServerId,
                                    (SELECT name from manga
                                        WHERE manga.mangaId = mangaInfo.mangaId
                                        LIMIT 1
                                    ) as title,
                                    mangaInfo.image,
                                    mangaInfo.sinopsis,
                                    mangaInfo.statusId,
                                    (SELECT chapterId from chapters
                                        WHERE chapters.mangaId = mangaInfo.mangaId
                                        ORDER BY chapterId DESC
                                        LIMIT 1
                                    ) as lastChapter,
                                    (SELECT dateAdded from chapters
                                        WHERE chapters.mangaId = mangaInfo.mangaId
                                        ORDER BY chapterId DESC
                                        LIMIT 1
                                    ) as lastChapterDateAdded
                            FROM mangaInfo
                            INNER JOIN (SELECT mangaId FROM manga WHERE name LIKE $search) as Search
                                ON mangaInfo.mangaId = Search.mangaId
                            GROUP BY mangaInfo.mangaId;`);

        try{
            // console.log({...mangaInfoData, mangaName: mangaName});

            let res : MangaBriefInfoData[] = sql.all({search: `%${search}%`});

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

    
    static async userBrief(search: string): Promise<UserBriefData[]> {
        let sql = db.prepare(`SELECT userId,
                                    username,
                                    image,
                                    dateAdded
                                FROM users
                                WHERE username LIKE $search;`);

        try{
            // console.log({...mangaInfoData, mangaName: mangaName});

            let res : UserBriefData[] = sql.all({search: `%${search}%`});

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
}