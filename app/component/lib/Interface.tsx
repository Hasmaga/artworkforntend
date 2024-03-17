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

export interface PostetArtwork {
    postId: string;
    contentPost: string;
    creatorName: string;
    createDateTime: string;
    likeCount: number;
    listArtwork: Artwork[];
}

export interface Artwork {
    artworkId: string;
    artworkName: string;
    creatorName: string;
    typeOfArtwork: TypeOfArtwork[];
    createDateTime: string;
    likeCount: number;
    image: string;
}

export interface LoginAsyncReponse {
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

export interface CreateTypeOfArtwork {
    type: string;
    typeDescription: string;
}

export interface GetCreator {
    creatorId: string;
    creatorFristName: string;
    creatorLastName: string;
}

export interface AsyncResponse<T> {
    status: string;
    data?: T;
    error?: string;
}

export interface CreateBooking {
    creatorId: string;
    contentBooking: string;
    listTypeOfArtwork: string[];
    price: number;
}

export interface LoggedInAccount {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    balance: number;
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

export interface TypeOfArtwork {
    id: string;
    type: string;
    typeDescription: string;
    statusName: string;
}

export interface UpdateTypeOfArtwork {
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

export interface CreateRequestBooking {
    bookingId: string;
    contentRequest: string;
}

export interface RegisterMember {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface BookingByCreator {
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

export interface ChangeStatusBookingByCreator {
    bookingId: string;
    isAccept: boolean;
}

export interface AccountResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    statusName: string;
    roleName: string;
}

export interface CreateAccountDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface UpdateAccountDto {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface ChangeStatusRequestDto {
    id: string;
    statusName: string;
}
export interface ChangeStatusRequestByCreator {
    requestBookingId: string;
    isAccept: boolean;
}

export interface BookingByAdmin {
    bookingId: string;
    customerName: string;
    creatorName: string;
    listTypeOfArtwork: TypeOfArtwork[];
    statusName: string;
    description: string;
    price: number;
    image: string;
    requestBooking: RequestBooking[];
    createDateTime: string;
}

export interface GetArtworkByCreator {
    artworkId: string;
    title: string;
    description: string;
    image: string;
    typeOfArtworks: TypeOfArtwork[];
    StatusName: string;
    createDateTime: string;
    userOwnerName: string;
    price: number;
}

export interface GetArtworkByCustomer {
    artworkId: string;
    artworkName: string;
    description: string;
    image: string;
    creatorName: string;
    statusName: string;
    artworkList: TypeOfArtwork[];
    price: number;
    createDateTime: string;
}

export interface UploadArtworkByCreator {
    artworkName: string;
    artworkDescription: string;
    typeOfArtwork: string[];
    isPublic: boolean;
    artworkPrice: number;
}

export interface CreatePostByCreator {
    contentPost: string;
    listArtwork: string[];
}

export interface ChangePasswordNotAuthentications {
    email: string;
    otpCode: string;
    newPassword: string;
}

export interface GetArtworkByGuest {
    creatorName: string;
    artworkName: string;
    description: string;
    artworkTypeList: TypeOfArtwork[];
    image: string;
    price: number;
    isSold: boolean;
    createDateTime: string;
    likeCount: number;
    isLike: boolean;
}

export interface PaymentResponse {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    zp_trans_token: string;
    order_url: string;
    order_token: string;
    qr_code: string;
}