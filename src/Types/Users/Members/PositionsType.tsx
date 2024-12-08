export interface Position {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    image?: string;
}
export interface CreatePositionType {
    name: string;
    description: string;
}

export interface UpdatePositionType extends CreatePositionType{
    id: string;
}

export interface InitialStatePositionType {
    dataExpertise: Position[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateExpertiseType: boolean;
    isOpenModalEditExpertiseType: boolean;
    isOpenModalDeleteExpertiseType: boolean;
    selectedExpertiseType: Position | null;
}



export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface ExpertisesListTypeTableColumnType extends Position {}