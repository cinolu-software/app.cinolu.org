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
export interface ActivityFormpropsType {
    horizontalWizardClass?: string;
    heading: string;
    firstXl?: number;
    secondXl?: number;
    xs?: number;
}
export interface FormInputType {
    name: string;
    type: string;
    label: string;
    required?: boolean;
    options?: string[];
}
export interface DynamicFormType {
    inputs: FormInputType[];
}
export interface FormFieldType {
    id: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date';
    label: string;
    options: string[];
    required?: boolean;
}
export interface ReviewFormType {
    phase: string;
    fields: FormFieldType[];
}
export interface formValueType {
    id: string,
    name: string,
    description: string,
    started_at: string,
    ended_at: string,
    program: string,
    form: DynamicFormType[] | null,
    review_form: ReviewFormType[] | null,
    categories: string[],
    partners: string[],
}
export interface createActivityType {
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    program: string;
    form: DynamicFormType[];
    review_form: ReviewFormType[];
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
    started_at: string;
    ended_at: string;
    image?:string;
    program: ProgramType;
    categories: CategoryType;
    phases: PhaseType[];
    is_published: boolean;
    form: DynamicFormType[];
    review_form: ReviewFormType[];
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





