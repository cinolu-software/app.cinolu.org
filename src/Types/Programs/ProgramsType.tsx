export interface Requirement {
    name: string;
    description: string;
}


export type ProgramsType = {
    id: number;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    types: number[];  // Modifié pour être un tableau de nombres
    requirements: Requirement[];  // Assurez-vous que requirements est un tableau d'objets Requirement
    image?: string;
    created_at: string;
    updated_at: string;
};

export type FormValueType = {
    id?: number;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    types: number[];  // Modifié pour être un tableau de nombres
    requirements: Requirement[];  // Assurez-vous que requirements est un tableau d'objets Requirement
    image?: string | undefined;
};

export interface TransformedProgramsType {
    id: number;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
    image: string;
    types: string[];
    requirements: any;
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
    navId: number;
    tabId: number;
    formValue: FormValueType | null;
}

export interface CreateProgramType {
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    image?: string;
    types: string[];
    requirements: Requirement[];
}

export interface ProgramListTableColumnType {
    id: number;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
    types: string[];
    requirements: Requirement[];
    image?: string;
}
