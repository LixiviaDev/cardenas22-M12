export type IChapterImage = {
    page: string;
    image: string;

}

export class ChapterImage {
    public page: string;
    public image: string;

    public constructor(args: IChapterImage){
        this.page = args.page;
        this.image = args.image;
    }
}