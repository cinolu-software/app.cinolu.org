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
export interface InitialStateActivityType {
    originalProjectData : [];
    publishedProjectData : [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    addFormValue: formValueType;
    editFormValue: formValueType;
    numberLevel: number;
    showFinish: boolean;
}





