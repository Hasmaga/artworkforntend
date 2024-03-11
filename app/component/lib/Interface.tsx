export interface Login {
    email: string;
    password: string;    
}

export interface SignUp {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

export interface PostetArtwork{
    postId: string;
    contentPost: string;
    creatorName: string;
    createDateTime: string;
    likeCount: number;
    listArtwork: Artwork[];
}

export interface Artwork{
    artworkId: string;
    artworkName: string;
    creatorName: string;
    typeOfArtwork: TypeOfArtwork[];
    createDateTime: string;
    likeCount: number;
    image: string;
}

export interface TypeOfArtwork{
    id: string;
    type: string;
    typeDescription: string;
}

export interface LoginAsyncReponse{
    status: string;
    data: string;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    balance: string;
}

export interface CreateTypeOfArtwork{
    type: string;
    typeDescription: string;
}

export interface GetCreator{
    creatorId: string;
    creatorFristName: string;
    creatorLastName: string;
}

export interface AsyncResponse<T> {
    status: string;
    data?: T;
    error?: string;
}
