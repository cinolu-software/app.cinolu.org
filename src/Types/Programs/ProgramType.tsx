export interface ProgramType {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface ProgramTypeWithImage extends ProgramType {
    image: string;
}

export interface InitialStateProgramType {
    originalPrograms: ProgramType[] | UpdateProgramType[];
    transformedPrograms: ProgramTypeWithImage[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any;
    isOpenModalCreateProgram: boolean;
    isOpenModalEditProgram: boolean;
    isOpenModalDeleteProgram: boolean;
    selectedProgram: ProgramType | null;
}

export interface CreateProgramType {
    name: string;
    description: string;
}

export interface UpdateProgramType {
    id: string;
    name: string;
    description: string;
}

export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface ProgramListTypeTableColumnType extends ProgramTypeWithImage {}