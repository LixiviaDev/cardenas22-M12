export type IMangaCardData = {
    title: string;
    img: string;
    href: string;
    hoverDisabled: boolean;
}

export class MangaCardData {
    public title: string;
    public img: string;
    public href: string;
    public hoverDisabled: boolean;

    public constructor(args: IMangaCardData){
        this.title = args.title;
        this.img = args.img;
        this.href = args.href;
        this.hoverDisabled = args.hoverDisabled ?? false;
    }
}