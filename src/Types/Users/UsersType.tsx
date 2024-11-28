export interface UserType {
    id: string;
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
    roles: any [];
}

export interface StaffMemberType extends UserType{}

export interface CoachsType extends  UserType{}

export interface InitialStateUserType {

    usersData : UserType[];
    coachsData : CoachsType[];
    staffMemberData : StaffMemberType[];

    statusUsers : 'idle' | 'loading' | 'succeeded' | 'failed';
    statusCoachs : 'idle' | 'loading' | 'succeeded' | 'failed';
    statusStaff : 'idle' | 'loading' | 'succeeded' | 'failed';

    filterToggle: boolean;
    errorUsers: string | null;
    errorCoachs: string | null;
    errorStaff: string | null;

    isOpenModalDeleteUser: boolean;
    isOpenModalDeleteCoach: boolean;
    isOpenModalDeleteStaffMember: boolean;

    isOpenModalUpdateCoach: boolean;
    isOpenModalUpdateUser: boolean;
    isOpenModalUpdateStaphMember: boolean;

    selectedUser: UserType | null;
    selectedCoach: CoachsType | null;
    selectedStaffMember: StaffMemberType | null

    navId: number;
    tabId: number;
    formValue: any;
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

