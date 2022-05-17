import { HttpException, HttpStatus } from "@nestjs/common";
import { MangaInfoData, MangaPreviewCardData } from "src/Common/CustomTypes/Manga";
import { ChapterData } from "src/Common/Tables/ChapterData";
import MangaInfoDataTable from "src/Common/Tables/MangaInfoData";
import { User } from "../../Common/CustomTypes/User";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class MangaRepository {
    static async addManga(mangaInfoData: MangaInfoDataTable, mangaName: string): Promise<void> {
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
    
    static async testMangaPreviewCard(page: number): Promise<MangaPreviewCardData[]> {
        // let args = {...chapterData, chapterImages: chapterImages, dateAdded: new Date(Date.now()).toISOString()};
        
        page = page ?? 0;

        console.log("Page: " + page);

        let sql = db.prepare(`
            SELECT distinct
                    m.mangaId,
                    m.name,
                    mI.image
            FROM manga m
            INNER JOIN mangaInfo mI 
                ON mI.mangaId = m.mangaId
            LIMIT 4
                OFFSET @page * 4;
            `);

        try{
            let res: MangaPreviewCardData[] = sql.all({page: page});

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async info(mangaId: string): Promise<MangaInfoData> {

        let sql = db.prepare(`
        SELECT  mI.mangaId,
                m.name as title,
                mI.mangaServerId,
                mI.image,
                (
                SELECT GROUP_CONCAT(name, '=') FROM mangaAuthors
                    WHERE mangaId = mI.mangaId
                ) authors,
                (
                SELECT GROUP_CONCAT(name, '=') FROM mangaArtists
                    WHERE mangaId = mI.mangaId
                ) artists,
                (
                SELECT GROUP_CONCAT(tagId, '=') FROM mangaTags
                    WHERE mangaId = mI.mangaId
                ) tags,
                (
                SELECT dateAdded FROM chapters
                    WHERE mangaID = mI.mangaId
                    ORDER BY dateAdded DESC
                    LIMIT 1
                ) lastUpdateChapterDateAdded,
                mI.sinopsis,
                mI.statusId,
                m.views,
                (SELECT AVG(score) FROM scores
                WHERE mangaID = mI.mangaId) score
        FROM mangaInfo mI
        INNER JOIN manga m
            ON m.mangaId = mI.mangaId
        WHERE mI.mangaID = @mangaId;
            `);

        try{
            let res: MangaInfoData = sql.get({mangaId: mangaId});

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
  }