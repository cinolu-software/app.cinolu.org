export type RequirementType = {
    id?: number;
    name: string;
    description: string;
}

export type AttachmentType = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export type DataType = {
    id: number;
    name: string;
    description: string;
}

export interface CreateProgramType  {
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    types: number[];
    requirements: RequirementType[];
}

export interface ReceiveProgramsType {
    id: number;
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    image: string;
    attachments: AttachmentType[];
    types: DataType[];
    requirements?: RequirementType[];
    created_at: string;
    updated_at: string
}

export interface FormValueType  {
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    types: number[];
    requirements: RequirementType[];
}

export interface InitialStateProgramsType {
    originalProgramsData: ReceiveProgramsType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateProgram: boolean;
    isOpenModalEditProgram: boolean;
    isOpenModalDeleteProgram: boolean;
    selectedProgram: ReceiveProgramsType | null;
    navId: number;
    tabId: number;
    formValue: FormValueType | null;
    EditFormValue: FormValueType | null;
}



