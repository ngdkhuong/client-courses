export interface StudentRegisterData {
    fullName: string;
    email: string;
    mobile?: string;
    password: string;
}

export interface StudentLoginData {
    email: string;
    password: string;
}
