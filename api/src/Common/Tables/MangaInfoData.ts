export type IMangaInfoData = {
    mangaId: string;
    mangaServerId: number;
    image: string;
    lastChapter: number;
    sinopsis: string;
    lastUpdateChapterId: number;
    statusId: number;
    dateAdded: string;

}

export class MangaInfoData {
    public mangaId: string;
    public mangaServerId: number;
    public image: string;
    public lastChapter: number;
    public sinopsis: string;
    private lastUpdateChapterId: number;
    private statusId: number;
    private dateAdded: string;

    public constructor(args: IMangaInfoData){
        this.mangaId = args.mangaId;
        this.mangaServerId = args.mangaServerId;
        this.image = args.image;
        this.lastChapter = args.lastChapter;
        this.sinopsis = args.sinopsis;
        this.lastUpdateChapterId = args.lastUpdateChapterId;
        this.statusId = args.statusId;
        this.dateAdded = args.dateAdded;
    }
}