export interface UserType {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
    name: string;
    password: string;
    phone_number: string;
    address: string;
    google_image: string;
    profile: string;
    verified_at: string;
    created_at: string;
    updated_at: string;
    role: string;
}

export interface InitialStateUserType {
    usersData: UserType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    error: string | null;
    isOpenModalCreateUser: boolean;
    isOpenModalEditUser: boolean;
    isOpenModalDeleteUser: boolean;
    selectedUser: UserType | null;
}

export interface CreateUserType {
    email: string;
    first_name?: string;
    last_name?: string;
    name: string;
    password: string;
    phone_number: string;
    address: string;
    roles: string[];
}

export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface UsersListTableColumnType extends UserType {}

