export interface ProgramsType {
    id: number;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
    image?: string;
}

export interface TransformedProgramsType {
    id: number;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
    image: string;
}

export interface InitialStateProgramsType {
    originalProgramsData: ProgramsType[];
    transformedProgramsData: TransformedProgramsType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateProgram: boolean;
    isOpenModalEditProgram: boolean;
    isOpenModalDeleteProgram: boolean;
    selectedProgram: ProgramsType | null;
}

export interface CreateProgramType {
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    image?: string;
}

export interface ProgramListTableColumnType {
    id: number;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
}

export interface ProgramListTableNameType {
    name: string;
    description: string;
    start_at: string;
    end_at: string;
}

export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface ProgramsListTableColumnType extends ProgramsType {}

export interface ProgramsListTableNameType {
    image: string;
    name: string;
}