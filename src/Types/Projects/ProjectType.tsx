import {ChangeEvent} from "react";
import {PartnerType} from "@/Types/PartnerType/PartnerType";

export type RequirementType = {
    id?: string;
    name: string;
    description: string;
}

export type AttachmentType = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export type PhaseType = {
    id: string;
    name: string;
    description: string;
    started_at: string;
    updated_at: string;
    ended_at: string;
    requirements: RequirementType[];
}

export type DataType = {
    id: string;
    name: string;
    description: string;
}

export interface CreateProjectType {
    name: string;
    description: string;
    targeted_audience: string;
    program: string;
    started_at: string;
    ended_at: string;
    types?: string[];
    aim?: string;
    prize?: string;
    town?: string;
    categories?:  string[];
    partners: PartnerType [] | string[];
}

export interface UpdateProjectType extends CreateProjectType {
    report?: Object;
}


export interface ReceiveProjectType {
    id: string;
    name: string;
    description: string;
    targeted_audience: string;
    started_at: string;
    ended_at: string;
    image?: string;
    program: string;
    aim?: string;
    prize?: string;
    town?: string;
    phases?: PhaseType[];
    report?: {
        "Nombre total de participants"?: number;
        [key: string]: any;
    };
    attachments: AttachmentType[];
    types?: DataType[];
    categories?: any;
    partners: string[];
    created_at: string;
    updated_at: string;
}



export interface ReceiveProjectTypeTable {
    project: ReceiveProjectType[];
    projectStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface FormValueType {
    id: string;
    name: string;
    description: string;
    program: any;
    targeted_audience: string;
    started_at: string;
    ended_at: string;
    types?: any;
    aim?: string;
    prize?: string;
    town?: string;
    categories?: any;
    partners:  string[] ;
}

export interface ProjectDataType extends FormValueType {
}

export interface InitialStateProjectType {
    originalProjectData: ReceiveProjectType[];
    publishedProjectData :ReceiveProjectType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    publishedProjectStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateProject: boolean;
    isOpenModalEditProject: boolean;
    isOpenModalDeleteProject: boolean;
    filterToggle: boolean;
    selectedProject?: ReceiveProjectType | null ;
    projectData: ReceiveProjectType | null;
    navId: number;
    tabId: number;
    formValue: FormValueType;
    EditFormValue: any | null;
    numberLevel: number,
    showFinish: boolean;
}

export type StepperHorizontalPropsType = {
    level: number;
};

interface BasicInputFormValueInterFace {
    email: string;
    firstName: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
    placeHolderName: string;
    cardNumber: string;
    expiration: string;
    cvvNumber: string;
    uploadDocumentation: string;
    informationCheckBox: boolean;
    linkedInLink: string;
    gitHubLink: string;
    giveFeedBack: string;
    state: string;
    agreeConditions: boolean;
}

export type NumberingWizardPropsType = {
    getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
    basicInputFormValue: BasicInputFormValueInterFace;
    level?: number;
};

export interface StepPropsType {
    data :  FormValueType;
}

export interface StepFiveProps {
    data: FormValueType;
    normalizedPartners: string[];
}

export interface FormEditorsProps {
    description: string | undefined;
    onChangeDescription: (value: string) => void;
}