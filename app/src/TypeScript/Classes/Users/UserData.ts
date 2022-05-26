export type IUserBriefData = {
    userId: string;
    username: string;
    img: string;
    dateAdded: string;
}

export class UserBriefData {
    userId: string;
    username: string;
    img: string;
    dateAdded: string;

    public constructor(args: IUserBriefData){
        this.userId = args.userId;
        this.username = args.username;
        this.img = args.img;
        this.dateAdded = args.dateAdded;
    }
}