export interface PostCategoryType {
    id: string ;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface InitialStatePostCategoryType{
    postCategoryData: PostCategoryType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    isOpenModalCreateCategory: boolean;
    isOpenModalEditCategory: boolean;
    isOpenModalDeleteCategory: boolean;
    selectedCategory: PostCategoryType | null;
    loading: boolean;
    error: string | null;
}

export interface CreateCategoryType {
    name: string;
}

export interface UpdateCategoryType {
    id: string ;
    name: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface StaticModalToggleProp{
    staticModalToggle: () => void;
}

export interface CategoryListTableColumnType extends PostCategoryType {}