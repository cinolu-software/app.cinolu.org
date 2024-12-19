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
    dataPosition: Position[];
    statusPosition: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreatePosition: boolean;
    isOpenModalEditPosition: boolean;
    isOpenModalDeletePosition: boolean;
    selectedPosition: Position | null;
}



export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface PositionsListTypeTableColumnType extends Position {}