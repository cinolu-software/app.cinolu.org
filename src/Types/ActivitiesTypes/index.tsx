import {ChangeEvent} from "react";


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

export interface BankLogoListProp {
    getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
    differentId?: boolean;
}




