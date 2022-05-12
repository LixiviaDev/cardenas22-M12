export type User = {
    username: string;
    roles: number[];
};

export function newUser() {
    return {
        username: "",
        roles: [],
    }
}