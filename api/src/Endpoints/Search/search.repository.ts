import { HttpException, HttpStatus } from "@nestjs/common";
import { MangaBriefInfoData } from "src/Common/CustomTypes/Manga";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class SearchRepository {
    static async manga(search: string): Promise<MangaBriefInfoData[]> {
        let sql = db.prepare(`SELECT mangaId,
                                (SELECT name from manga
                                    WHERE manga.mangaId = mangaInfo.mangaId
                                    LIMIT 1
                                ) as title,
                                image,
                                sinopsis,
                                statusId,
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
                        WHERE mangaId LIKE $search
                        GROUP BY mangaId`);

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
}