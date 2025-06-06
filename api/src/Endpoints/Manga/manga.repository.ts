import { HttpException, HttpStatus } from "@nestjs/common";
import { ChapterImage } from "src/Common/CustomTypes/Chapter";
import { MangaBriefInfoData, MangaInfoData, MangaManagementData, MangaPreviewCardData } from "src/Common/CustomTypes/Manga";
import { ChapterData } from "src/Common/Tables/ChapterData";
import MangaInfoDataTable from "src/Common/Tables/MangaInfoData";
import { User } from "../../Common/CustomTypes/User";

const Database = require('better-sqlite3');
const db = new Database('./db.db', { verbose: console.log });

export default class MangaRepository {
    static async getOneBrief(mangaId: string): Promise<MangaBriefInfoData> {
        
        let sql = db.prepare(`
                                SELECT mangaInfo.mangaId,
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
                                INNER JOIN (SELECT mangaId FROM manga WHERE mangaId = $mangaId) as Search
                                    ON mangaInfo.mangaId = Search.mangaId
                                GROUP BY mangaInfo.mangaId
                                LIMIT 1;
                                `);

        try{
            let res : MangaBriefInfoData = sql.get({mangaId: mangaId});

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
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
    
    static async managementData(mangaId: string): Promise<MangaManagementData> {

        let sql = db.prepare(`
                                SELECT mangaInfo.mangaId,
                                mangaInfo.mangaServerId,
                                (SELECT name from manga
                                    WHERE manga.mangaId = mangaInfo.mangaId
                                    LIMIT 1
                                ) as title,
                                mangaInfo.image,
                                mangaInfo.sinopsis,
                                (
                                SELECT GROUP_CONCAT(name, '|') FROM mangaAuthors
                                    WHERE mangaId = mangaInfo.mangaId
                                ) authors,
                                (
                                SELECT GROUP_CONCAT(name, '|') FROM mangaArtists
                                    WHERE mangaId = mangaInfo.mangaId
                                ) artists,
                                (
                                SELECT GROUP_CONCAT(tagId, '|') FROM mangaTags
                                    WHERE mangaId = mangaInfo.mangaId
                                ) tags,
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
                                INNER JOIN (SELECT mangaId FROM manga WHERE mangaId = $mangaId) as Search
                                    ON mangaInfo.mangaId = Search.mangaId
                                GROUP BY mangaInfo.mangaId
                                LIMIT 1;
            `);

        try{
            let res: MangaManagementData = sql.get({mangaId: mangaId});

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async chapterList(mangaId: string, mangaServerId: number): Promise<ChapterData[]> {

        let sql = db.prepare(`
        SELECT chapterId, mangaId, mangaServerId, dateAdded 
        FROM chapters
            WHERE mangaId = @mangaId
                AND mangaServerId = @mangaServerId
        ORDER BY chapterId;
            `);

        try{
            let res: ChapterData[] = sql.all({mangaId: mangaId, mangaServerId: mangaServerId});

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async chapterImages(mangaId: string, mangaServerId: number, chapterId: number): Promise<ChapterImage[]> {

        let sql = db.prepare(`
        SELECT page, image FROM chapterImages
        WHERE chapterId = @chapterId
            AND mangaId = @mangaId
            AND mangaServerId = @mangaServerId;
            `);

        try{
            let res: ChapterImage[] = sql.all({
                mangaId: mangaId, 
                mangaServerId: mangaServerId,
                chapterId: chapterId
            });

            return res;
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async addWriter(mangaId: string, name: string): Promise<void> {
        let sql = db.prepare(`
                            INSERT INTO mangaAuthors (
                                mangaId,
                                name,
                                dateAdded
                            )
                            VALUES (
                                $mangaId,
                                $name,
                                $dateAdded
                            );
                            `);

        try{
            sql.run({mangaId: mangaId, name: name, dateAdded: new Date(Date.now()).toISOString()});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async removeWriter(mangaId: string, name: string): Promise<void> {
        let sql = db.prepare(`
                            DELETE FROM mangaAuthors
                            WHERE mangaId = $mangaId AND 
                                name = $name;
                            `);

        try{
            sql.run({mangaId: mangaId, name: name, dateAdded: new Date(Date.now()).toISOString()});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async addArtist(mangaId: string, name: string): Promise<void> {
        let sql = db.prepare(`
                            INSERT INTO mangaArtists (
                                mangaId,
                                name,
                                dateAdded
                            )
                            VALUES (
                                $mangaId,
                                $name,
                                $dateAdded
                            );
                            `);

        try{
            sql.run({mangaId: mangaId, name: name, dateAdded: new Date(Date.now()).toISOString()});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async removeArtist(mangaId: string, name: string): Promise<void> {
        let sql = db.prepare(`
                            DELETE FROM mangaArtists
                            WHERE mangaId = $mangaId AND 
                                name = $name;
                            `);

        try{
            sql.run({mangaId: mangaId, name: name, dateAdded: new Date(Date.now()).toISOString()});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async addTag(mangaId: string, tagId: string): Promise<void> {
        let sql = db.prepare(`
                            INSERT INTO mangaTags (
                                mangaId,
                                tagId
                            )
                            VALUES (
                                $mangaId,
                                $tagId
                            );
                            `);

        try{
            sql.run({mangaId: mangaId, tagId: tagId});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async removeTag(mangaId: string, tagId: string): Promise<void> {
        let sql = db.prepare(`
                            DELETE FROM mangaTags
                            WHERE mangaId = $mangaId AND 
                                tagId = $tagId;
                            `);

        try{
            sql.run({mangaId: mangaId, tagId: tagId});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async changeTitle(mangaId: string, title: string): Promise<void> {
        let sql = db.prepare(`
                            UPDATE manga
                            SET name = $name
                            WHERE mangaId = $mangaId;
                            `);

        try{
            sql.run({mangaId: mangaId, name: title});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async changeState(mangaId: string, mangaServerId: string, state: string): Promise<void> {
        let sql = db.prepare(`
                            UPDATE mangaInfo
                            SET statusId = $state
                            WHERE mangaId = $mangaId AND 
                                mangaServerId = $mangaServerId;
                            `);

        try{
            sql.run({mangaId: mangaId, mangaServerId: mangaServerId, state: state});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }
    
    static async changeSinopsis(mangaId: string, mangaServerId: string, sinopsis: string): Promise<void> {
        let sql = db.prepare(`
                            UPDATE mangaInfo
                            SET sinopsis = $sinopsis
                            WHERE mangaId = $mangaId AND 
                                mangaServerId = $mangaServerId;
                            `);

        try{
            sql.run({mangaId: mangaId, mangaServerId: mangaServerId, sinopsis: sinopsis});
        }
        catch(e) {
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }

  }