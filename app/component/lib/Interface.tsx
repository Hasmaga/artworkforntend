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