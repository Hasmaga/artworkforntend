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

export interface CreateBooking{
    creatorId: string;
    contentBooking: string;
    listTypeOfArtwork: string[];
    price: number;
}

export interface LoggedInAccount{
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
    balance : number;
}

export interface BookingByCustomer {
    bookingId: string;
    creatorName: string;
    listTypeOfArtwork: TypeOfArtwork[];
    statusName: string;
    description: string;
    price: number;
    image: string;
    requestBooking: RequestBooking[];
    createDateTime: string;
}

export interface TypeOfArtwork{
    id: string;
    type: string;
    typeDescription: string;
    statusName: string;
}

export interface UpdateTypeOfArtwork{
    typeOfArtworkID: string;
    type: string;
    typeDescription: string;
}

export interface RequestBooking {
    requestBookingId: string;
    description: string;
    statusName: string;
    image: string;
    createDateTime: string;
}

export interface CreateRequestBooking{
    bookingId: string;
    contentRequest: string;
}

export interface RegisterMember{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface BookingByCreator{
    bookingId: string;
    userName: string;
    listTypeOfArtwork: TypeOfArtwork[];
    statusName: string;
    description: string;
    price: number;
    image: string;
    requestBooking: RequestBooking[];
    createDateTime: string;
}

export interface ChangeStatusBookingByCreator{
    bookingId: string;
    isAccept: boolean;
}

export interface AccountResponseDto{
    id : string;
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
    statusName : string;
    roleName : string;
} 

export interface CreateAccountDto{
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
    password : string;
}

export interface UpdateAccountDto{
    id : string;
    firstName : string;
    lastName : string;
    phoneNumber : string;
}