export interface IUserData {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    imageURL: string,
    description: string,
}

export interface IAuthenticate {
    email: string,
    displayName: string,
    photoURL: string,
}