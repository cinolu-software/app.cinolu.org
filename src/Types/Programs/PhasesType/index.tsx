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
    program: string;
}

export interface FormEditValue extends FormValue{
    form : string;
}


export interface ProgramPhaseType {
    id?: string;
    name : string;
    description: string;
    started_at: string;
    ended_at: string;
    program: string
}

export interface CreateProgramPhaseType extends  ProgramPhaseType{}

export interface  FormValue extends ProgramPhaseType{}

export interface InitialStateProgramPhaseType{
    ProgramDataPhase: ProgramPhaseType [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    formValue : FormValue;
    isOpenModalCreateProgramPhase: boolean;
    isOpenModalEditProgramPhase: boolean;
    isOpenModalDeleteProgramPhase: boolean;
    selectedProgramPhase: ProgramPhaseType | null
}