export type IChapterImageData = {
    chapterId: number;
    mangaId: string;
    mangaServerId: number;
    page: number;
    image: string;
    dateAdded: string;

}

export class ChapterImageData {
    public chapterId: number;
    public mangaId: string;
    public mangaServerId: number;
    public page: number;
    public image: string;
    private dateAdded: string;

    public constructor(args: IChapterImageData){
        this.chapterId = args.chapterId;
        this.mangaId = args.mangaId;
        this.mangaServerId = args.mangaServerId;
        this.page = args.page;
        this.image = args.image;
        this.dateAdded = args.dateAdded;
    }
}