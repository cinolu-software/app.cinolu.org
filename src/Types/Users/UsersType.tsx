

export interface UserType {
    id : number;
    email: string;
    first_name: string;
    name: string;
    last_name: string;
    password: string;
    phone_number: string;
    address: string;
    token: string;
    google_image: string;
    profile: string;
    verified_at: string;
    created_at: string;
    updated_at: string
}

export interface InitialStateUserType{
    usersData : UserType [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error : string | null;
}