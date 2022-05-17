export type IChapterData  = {
    chapterId: string;
    dateAdded: string;
}

export class ChapterData {
    public chapterId: string;
    public dateAdded: string;

    public constructor(args: IChapterData ){
        this.chapterId = args.chapterId;
        this.dateAdded = args.dateAdded;
    }
}