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
    private dateAdded: string;

    public constructor(args: IChapterData){
        this.chapterId = args.chapterId;
        this.mangaId = args.mangaId;
        this.mangaServerId = args.mangaServerId;
        this.dateAdded = args.dateAdded;
    }
}