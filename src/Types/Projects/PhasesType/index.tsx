export interface Props {
    navId: string;
    setNavId: (id: string) => void;
}
export interface PhaseNavMenuProps extends Props {}
export interface PhaseSideBarProps extends Props {}
export interface PhaseLeftSidebarProps extends Props {}

export interface PhaseRightSideProps {
    navId: string;
}

export interface FormValue {
    name: string;
    description: string;
    started_at: string;
    ended_at: string;
    project: string;
}
export interface FormInputType {
    name: string;
    type:string;
    label:string;
    required:boolean;
}

export interface DynamicFormType {
    inputs: FormInputType[]
}

export interface ProjectPhaseType {
    id?: string;
    name : string;
    description: string;
    started_at: string;
    ended_at: string;
    project: string;
    form?: DynamicFormType;
}

export interface CreateProjectPhaseType extends  ProjectPhaseType{}

export interface  FormValue extends ProjectPhaseType{}

export interface InitialStateProjectPhaseType{
    ProjectDataPhase: ProjectPhaseType [];
    dataPhase: ProjectPhaseType[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    statusPhase: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    formValue : FormValue;
    isOpenModalCreateProjectPhase: boolean;
    isOpenModalEditProjectPhase: boolean;
    isOpenModalDeleteProjectPhase: boolean;
    selectedProjectPhase: ProjectPhaseType | null;
}