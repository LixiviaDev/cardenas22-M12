export class User {
    username: string;
    roles: string[];
}

export class UserJWT {
    userData: User;
    iat: number;
    exp: number;
}

// export function newUser() {
//     return {
//         username: "",
//         roles: []
//     }
// }