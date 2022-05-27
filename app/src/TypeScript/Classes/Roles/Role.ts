export type IRole = {
    roleId: string;
    name: string;
}

export class Role {
    roleId: string;
    name: string;

    public constructor(args: IRole){
        this.roleId = args.roleId;
        this.name = args.name;
    }
}