export interface ProgramsTypeType {
    id: string; 
    name?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    image?: string;
}

export interface UpdateTypeType {
    id: string | undefined;
    name : string | undefined;
    description: string | undefined
}

export interface TransformedProgramsTypeType {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    image: string;
}

export interface InitialStateProgramsTypeType {
    originalTypeProgramsData: any;
    transformedProgramsData: TransformedProgramsTypeType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateProgramType: boolean;
    isOpenModalEditProgramType: boolean;
    isOpenModalDeleteProgramType: boolean;
    selectedProgramType: ProgramsTypeType | null;
}

export interface CreateProgramTypeType {
    name: string;
    description: string;
    image?: string;
}

export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface ProgramsListTypeTableColumnType extends ProgramsTypeType {}