export type IMangaInfoData = {
    mangaId: string;
    title: string;
    mangaServerId: number;
    image: string;
    lastChapter: number;
    sinopsis: string;
    lastUpdateChapterId: number;
    statusId: number;
    lastUpdateChapterDateAdded: string;

}

export class MangaInfoData {
    public mangaId: string;
    public title: string;
    public mangaServerId: number;
    public image: string;
    public lastChapter: number;
    public sinopsis: string;
    public lastUpdateChapterId: number;
    public statusId: number;
    public lastUpdateChapterDateAdded: string;

    public constructor(args: IMangaInfoData){
        this.mangaId = args.mangaId;
        this.title = args.title;
        this.mangaServerId = args.mangaServerId;
        this.image = args.image;
        this.lastChapter = args.lastChapter;
        this.sinopsis = args.sinopsis;
        this.lastUpdateChapterId = args.lastUpdateChapterId;
        this.statusId = args.statusId;
        this.lastUpdateChapterDateAdded = args.lastUpdateChapterDateAdded;
    }
}