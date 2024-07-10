
export interface RoleType {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface TransformedRoleType extends RoleType {
    image: string
}

export interface InitialStateRoleType {
    originalRoleData: RoleType[];
    transformedRoleData: TransformedRoleType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null
}

