export interface PasswordInfo {
    currentPassword: string;
    newPassword: string;
}

export interface UpdateProfileInfo {
    profilePic?: File | null;
    fullName?: string;
    email?: string;
    mobile?: string;
    qualification?: string;
    subjects?: string;
    experience?: string;
    skills?: string;
    about?: string;
}

export interface Instructor {
    isGoogleUser: boolean;
}
