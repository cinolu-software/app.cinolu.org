import {PartnerType} from "@/Types/PartnerType/PartnerType";

export interface NavComponentProp {
    activeTab?: number | undefined;
    callbackActive: (val: number | undefined) => void;
}
export interface ActivityFormTabContentPropsType {
    activeTab?: number | undefined;
    callbackActive: (val: number | undefined) => void;
    differentId?: boolean;
}

export interface formValueType {
    id: string,
    name: string,
    description: string,
    form_link: string,
    started_at: string,
    ended_at: string,
    program: string,
    categories: string[],
    partners: string[],
}

export interface createActivityType {
    name: string;
    description: string;
    form_link: string;
    started_at: string;
    ended_at: string;
    program: string;
    categories: string[];
    partners: string[];
}
export interface ProgramType {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}
export interface CategoryType {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
export interface RequirementType {
    name: string;
    description: string;
}

export interface PhaseType {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    requirements: RequirementType[];
}


export interface ActivityReceive {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    description: string;
    form_link: string;
    started_at: string;
    ended_at: string;
    image?:string;
    program: ProgramType;
    categories: CategoryType;
    phases: PhaseType[];
    is_published: boolean;
    partners: PartnerType;
}

export interface InitialStateActivityType {
    originalProjectData : ActivityReceive[];
    publishedProjectData : ActivityReceive[];
    isOpenModalCreateActivity: boolean;
    isOpenModalEditActivity: boolean;
    isOpenModalDeleteActivity: boolean;
    filterToggle: boolean;
    selectedActivity: ActivityReceive | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    fetchActivityByIdStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    fetchPublishedStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    addFormValue: formValueType;
    editFormValue: formValueType ;
    numberLevel: number;
    showFinish: boolean;
    error: null;
}





