
export interface NavComponentProp {
    callbackActive: (val: number | undefined) => void;
    activeTab: number | undefined;
}

export interface ActivityFormTabContentPropsType {
    activeTab: number | undefined;
    callbackActive : (val: number | undefined) => void;
}