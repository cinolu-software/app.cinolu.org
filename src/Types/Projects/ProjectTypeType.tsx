export interface ProjectTypeType {
    id: string; 
    name?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    image?: string;
}

export interface UpdateTypeType {
    id: string | undefined;
    name : string | undefined;
    description: string | undefined
}

export interface TransformedProjectTypeType {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    image: string;
}

export interface InitialStateProjectTypeType {
    originalTypeProjectData: any;
    transformedProjectData: TransformedProjectTypeType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateProjectType: boolean;
    isOpenModalEditProjectType: boolean;
    isOpenModalDeleteProjectType: boolean;
    selectedProjectType: ProjectTypeType | null;
}

export interface CreateProjectTypeType {
    name: string;
    description: string;
    image?: string;
}

export interface StaticModalToggleProp {
    staticModalToggle: () => void;
}

export interface ProjectListTypeTableColumnType extends ProjectTypeType {}