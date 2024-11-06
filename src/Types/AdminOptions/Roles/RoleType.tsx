export interface RoleType {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface TransformedRoleType {
    id: string;
    name: string;
    image?: string;
    created_at: string;
    updated_at: string;
}

export interface InitialStateRoleType {
    originalRoleData: RoleType[];
    transformedRoleData: TransformedRoleType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateRole: boolean;
    isOpenModalEditRole: boolean;
    isOpenModalDeleteRole: boolean;
    selectedRole: RoleType | null;
}

export interface CreateRole {
    name: string;
}

export interface RoleListTableColumnType {
    id : number;
    image: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface RoleListTableNameType {
    name: string;
    image: string;
}

export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

interface SpanType {
    text?: string;
    code?: string;
    mark?: string;
}

export interface CommonCardHeaderProp {
    title: string;
    span?: SpanType[];
    headClass?: string;
    icon?: JSX.Element;
    tagClass?: string;
}