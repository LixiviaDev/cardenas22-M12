export type IChapterData = {
    chapterId: number;
    mangaId: string;
    mangaServerId: number;
    dateAdded: string;
}

export class ChapterData {
    public chapterId: number;
    public mangaId: string;
    public mangaServerId: number;
    public dateAdded: string;

    public constructor(args: IChapterData){
        this.chapterId = args.chapterId;
        this.mangaId = args.mangaId;
        this.mangaServerId = args.mangaServerId;
        this.dateAdded = args.dateAdded;
    }
}

export type IChapterImageData = {
    page: string;
    image: string;

}

export class ChapterImageData {
    public page: string;
    public image: string;

    public constructor(args: IChapterImageData){
        this.page = args.page;
        this.image = args.image;
    }
}