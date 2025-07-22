export interface UserInterface {
    [key: string]: string | number | undefined | null | boolean;
    id: string;
    name: string;
    surName: string;
    password: string;
    fullName: string;
    email: string;
    birthDate?: string;
    telephone?: string;
    employment?: string;
    userAgreement?: boolean;
}

export interface UserCreateInterface {
    [key: string]: string | number | undefined | null | boolean;
    name: string;
    surName: string;
    password: string;
    fullName: string;
    email: string;
    birthDate?: string;
    telephone?: string;
}

export interface UserPatchInterface {
    [key: string]: string | number | undefined | null | boolean;
    name: string;
    surName: string;
    fullName: string;
    birthDate?: string;
    telephone?: string;
    employment?: string;
    userAgreement?: boolean;
}
