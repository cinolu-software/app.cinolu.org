export interface CategoryType {
    id : number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface TransformedCategoriesType{
    id: number;
    name: string;
    image: string;
    icon: string;
    badge: boolean;
    color: string;
    created_at: string;
    updated_at: string;
}

export interface InitialStateCategoriesType{
    originalCategoriesData : CategoryType [];
    transformedCategoriesData : TransformedCategoriesType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateCategory: boolean;
    isOpenModalEditCategory: boolean;
    isOpenModalDeleteCategory: boolean;
    selectedCategories: CategoryType | null;
}

export interface CreateCategoryType {
    name: string;
}

export interface CategoryListTableColumnType {
    id: number;
    image: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryListTableNameType {
    name: string;
    image: string;
}

export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}




