import {ChangeEvent} from "react";

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

export type DataType = {
    id: string;
    name: string;
    description: string;
}

export interface CreateProgramType {
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    types: number[];
    requirements: RequirementType[];
    partners: string[];
}

export interface ReceiveProgramsType {
    id: string;
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    image: string;
    attachments: AttachmentType[];
    types: DataType[];
    requirements?: RequirementType[];
    partners: string[];
    created_at: string;
    updated_at: string;
}

export interface FormValueType {
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    types: any;
    requirements: RequirementType[];
    partners: string[];
}

export interface InitialStateProgramsType {
    originalProgramsData: ReceiveProgramsType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateProgram: boolean;
    isOpenModalEditProgram: boolean;
    isOpenModalDeleteProgram: boolean;
    filterToggle: boolean;
    selectedProgram: ReceiveProgramsType | null;
    navId: number;
    tabId: number;
    formValue: FormValueType;
    EditFormValue: FormValueType | null;
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


