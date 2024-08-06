export interface ProgramsTypeType {
    id: number; // Assurez-vous que id est obligatoire
    name?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    image?: string;
}

export interface TransformedProgramsTypeType {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    image: string;
}

export interface InitialStateProgramsTypeType {
    originalTypeProgramsData: ProgramsTypeType[];
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