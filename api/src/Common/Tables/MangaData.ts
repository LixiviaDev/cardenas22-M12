export type IMangaData = {
    mangaId: string;
    name: string;
    views: number;

}

export class MangaData {
    public mangaId: string;
    public name: string;
    private views: number;

    public constructor(args: IMangaData){
        this.mangaId = args.mangaId;
        this.name = args.name;
        this.views = args.views;
    }
}