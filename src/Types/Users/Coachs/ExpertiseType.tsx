export interface Expertise {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    image?: string;
}
export interface CreateExpertiseType {
    name: string;
    description: string;
}

export interface UpdateExpertiseType extends CreateExpertiseType{
    id: string;
}

export interface InitialStateExpertiseType {
    dataExpertise: Expertise[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateExpertiseType: boolean;
    isOpenModalEditExpertiseType: boolean;
    isOpenModalDeleteExpertiseType: boolean;
    selectedExpertiseType: Expertise | null;
}



export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface ExpertisesListTypeTableColumnType extends Expertise {}