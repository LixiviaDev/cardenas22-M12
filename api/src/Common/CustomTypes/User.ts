export class User {
    userId: string;
    username: string;
    roles: string[];
}

export class UserJWT {
    userData: User;
    iat: number;
    exp: number;
}