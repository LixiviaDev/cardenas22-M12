import { HttpException, HttpStatus } from "@nestjs/common";
import { ChapterData } from "src/Common/Tables/ChapterData";
import { MangaInfoData } from "src/Common/Tables/MangaInfoData";
import { User } from "../../Common/CustomTypes/User";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class MangaRepository {
    static async addManga(mangaInfoData: MangaInfoData, mangaName: string): Promise<void> {
        let args = {...mangaInfoData, mangaName: mangaName, dateAdded: new Date(Date.now()).toISOString()};
        
        let sql = db.prepare(`
            INSERT OR IGNORE 
            INTO manga (
                mangaId,
                name
            )
            VALUES (
                $mangaId,
                $mangaName
            );`);

        try{
            // console.log({...mangaInfoData, mangaName: mangaName});

            sql.run(args);
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }

        sql = db.prepare(`
        INSERT INTO mangaInfo (
            mangaId,
            mangaServerId,
            image,
            lastChapter,
            sinopsis,
            dateAdded
        )
        VALUES (
            $mangaId,
            $mangaServerId,
            $image,
            $lastChapter,
            $sinopsis,
            $dateAdded
        );`);

        try{
            // console.log({...mangaInfoData, mangaName: mangaName});

            sql.run(args);
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    static async addChapter(chapterData: ChapterData, chapterImages: string[]): Promise<void> {
        // let args = {...chapterData, chapterImages: chapterImages, dateAdded: new Date(Date.now()).toISOString()};
        
        console.log(chapterData);
        console.log(chapterImages);

        let sql = db.prepare(`
            INSERT OR IGNORE 
            INTO chapters (
                chapterId,
                mangaId,
                mangaServerId,
                dateAdded
            )
            VALUES (
                @chapterId,
                @mangaId,
                @mangaServerId,
                @dateAdded
            );`);

        try{
            sql.run({...chapterData, dateAdded: new Date(Date.now()).toISOString()});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }

        sql = db.prepare(`
            INSERT INTO chapterImages (
                chapterId,
                mangaId,
                mangaServerId,
                page,
                image,
                dateAdded
            )
            VALUES (
                @chapterId,
                @mangaId,
                @mangaServerId,
                @page,
                @image,
                @dateAdded
            );`);

        try{
            for(let img in chapterImages){
                sql.run({...chapterData, page: img, image: chapterImages[img], dateAdded: new Date(Date.now()).toISOString()});
            }
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
  }