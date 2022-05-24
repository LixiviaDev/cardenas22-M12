export type IMangaPreviewCardData = {
    mangaId: string;
    name: string;
    image: string;

}

export class MangaPreviewCardData {
    public mangaId: string;
    public name: string;
    public image: string;

    public constructor(args: IMangaPreviewCardData){
        this.mangaId = args.mangaId;
        this.name = args.name;
        this.image = args.image;
    }
}

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
    public authors: Array<string>;
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

export type IMangaBriefInfoData = {
    mangaId: string;
    mangaServerId: string;
    title: string;
    image: string;
    sinopsis: string;
    statusId: string;
    lastChapter: string;
    lastChapterDateAdded: string;
}

export class MangaBriefInfoData {
    public mangaId: string;
    public mangaServerId: string;
    public title: string;
    public image: string;
    public sinopsis: string;
    public statusId: string;
    public lastChapter: string;
    public lastChapterDateAdded: string;

    public constructor(args: IMangaBriefInfoData){
        this.mangaId = args.mangaId;
        this.mangaServerId = args.mangaServerId;
        this.title = args.title;
        this.image = args.image;
        this.sinopsis = args.sinopsis;
        this.statusId = args.statusId;
        this.lastChapter = args.lastChapter;
        this.lastChapterDateAdded = args.lastChapterDateAdded;
    }
}