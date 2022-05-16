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