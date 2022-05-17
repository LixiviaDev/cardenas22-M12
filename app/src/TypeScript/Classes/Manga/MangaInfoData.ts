export type IMangaInfoData = {
    mangaId: string;
    title: string;
    mangaServerId: number;
    image: string;
    authors: string[];
    artists: string[];
    tags: string[];
    sinopsis: string;
    statusId: string;
    views: number;
    score: number;
    lastUpdateChapterDateAdded: string;

}

export class MangaInfoData {
    public mangaId: string;
    public title: string;
    public mangaServerId: number;
    public image: string;
    public authors: string[];
    public artists: string[];
    public tags: string[];
    public sinopsis: string;
    public statusId: string;
    public views: number;
    public score: number;
    public lastUpdateChapterDateAdded: string;

    public constructor(args: IMangaInfoData){
        this.mangaId = args.mangaId;
        this.title = args.title;
        this.mangaServerId = args.mangaServerId;
        this.image = args.image;
        this.authors = args.authors;
        this.artists = args.artists;
        this.tags = args.tags;
        this.sinopsis = args.sinopsis;
        this.statusId = args.statusId;
        this.views = args.views;
        this.score = args.score;
        this.lastUpdateChapterDateAdded = args.lastUpdateChapterDateAdded;
    }
}