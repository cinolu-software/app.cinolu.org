import { CleaveOptions } from "cleave.js/options";
import { FormikErrors } from "formik";
import { ChangeEvent, RefObject } from "react";
import { InputType } from "reactstrap/types/lib/Input";


export interface ProjectCategoryType {
    id: string ;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface InitialStateCategoryType{
    projectCategoryData: ProjectCategoryType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filterToggle: boolean;
    isOpenModalCreateCategory: boolean;
    isOpenModalEditCategory: boolean;
    isOpenModalDeleteCategory: boolean;
    selectedCategory: ProjectCategoryType | null;
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

export interface CategoryListTableColumnType extends ProjectCategoryType {}

