
export interface ProgramsCategoryType {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface InitialStateCategoryType{
    programsCategoryData: ProgramsCategoryType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    isOpenModalCreateCategory: boolean;
    isOpenModalEditCategory: boolean;
    isOpenModalDeleteCategory: boolean;
    selectedCategory: ProgramsCategoryType | null;
    loading: boolean;
    error: string;
}

export interface CreateCategoryType {
    name: string;
}

export interface StaticModalToggleProp{
    staticModalToggle: () => void;
}

export interface CategoryListTableColumnType extends ProgramsCategoryType {}